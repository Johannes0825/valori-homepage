import { NextResponse, type NextRequest } from "next/server";
import type { EmailOtpType } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";

/**
 * Lander her fra e-postlenker (invitasjon, glemt passord, magic link).
 *
 * Støtter to varianter:
 *  - ?token_hash=…&type=invite|recovery|magiclink|email  (anbefalt, se README)
 *  - ?code=…                                            (PKCE-flyt)
 */
export async function GET(request: NextRequest) {
    const { searchParams, origin } = request.nextUrl;
    const tokenHash = searchParams.get("token_hash");
    const type = searchParams.get("type") as EmailOtpType | null;
    const code = searchParams.get("code");

    const supabase = await createClient();
    let ok = false;

    if (tokenHash && type) {
        const { error } = await supabase.auth.verifyOtp({
            type,
            token_hash: tokenHash,
        });
        ok = !error;
    } else if (code) {
        const { error } = await supabase.auth.exchangeCodeForSession(code);
        ok = !error;
    }

    if (!ok) {
        return NextResponse.redirect(
            `${origin}/timer/logg-inn?feil=ugyldig-lenke`
        );
    }

    const needsPassword = type === "invite" || type === "recovery";
    const next = searchParams.get("next");
    const target = needsPassword
        ? "/timer/sett-passord"
        : next && next.startsWith("/timer")
          ? next
          : "/timer";

    return NextResponse.redirect(`${origin}${target}`);
}
