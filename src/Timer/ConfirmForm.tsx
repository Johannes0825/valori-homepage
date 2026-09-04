"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import type { EmailOtpType } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";
import AuthCard, { primaryBtnCls } from "./AuthCard";

const TYPER: Record<EmailOtpType, { tittel: string; knapp: string }> = {
    invite: { tittel: "Du er invitert", knapp: "Aktiver konto" },
    recovery: { tittel: "Nytt passord", knapp: "Fortsett" },
    magiclink: { tittel: "Logg inn", knapp: "Logg inn" },
    email: { tittel: "Bekreft e-post", knapp: "Bekreft" },
    signup: { tittel: "Bekreft e-post", knapp: "Bekreft" },
    email_change: { tittel: "Bekreft ny e-post", knapp: "Bekreft" },
};

/**
 * Verifiserer e-postlenker først når brukeren klikker – ikke ved sidelast.
 * Da bruker ikke e-postklienters lenkeskannere (Outlook Safe Links o.l.)
 * opp engangstokenet før brukeren rekker å klikke.
 */
export default function ConfirmForm() {
    const router = useRouter();
    const params = useSearchParams();
    const tokenHash = params.get("token_hash");
    const type = params.get("type") as EmailOtpType | null;
    const code = params.get("code");
    const [feil, setFeil] = useState<string | null>(null);
    const [laster, setLaster] = useState(false);

    const gyldig = (tokenHash && type && type in TYPER) || !!code;
    const tekst = (type && TYPER[type]) ?? TYPER.magiclink;

    async function bekreft() {
        setLaster(true);
        setFeil(null);
        const supabase = createClient();
        const { error } =
            tokenHash && type
                ? await supabase.auth.verifyOtp({ type, token_hash: tokenHash })
                : await supabase.auth.exchangeCodeForSession(code!);

        if (error) {
            setLaster(false);
            setFeil(
                /expired|invalid/i.test(error.message)
                    ? "Lenken er utløpt eller allerede brukt. Be om en ny invitasjon, eller bruk «Glemt passord» på innloggingssiden."
                    : `Kunne ikke bekrefte: ${error.message}`
            );
            return;
        }

        const trengerPassord = type === "invite" || type === "recovery";
        router.replace(trengerPassord ? "/timer/sett-passord" : "/timer");
        router.refresh();
    }

    if (!gyldig) {
        return (
            <AuthCard
                title="Lenken virker ikke"
                subtitle="Lenken mangler nødvendig informasjon. Be om en ny invitasjon."
            >
                <Link href="/timer/logg-inn" className={primaryBtnCls}>
                    Til innlogging
                </Link>
            </AuthCard>
        );
    }

    return (
        <AuthCard
            title={tekst.tittel}
            subtitle="Klikk for å fortsette. Du velger passord i neste steg."
        >
            {feil && (
                <p className="mb-3 text-[13px] text-[#C05B3E]" role="alert">
                    {feil}
                </p>
            )}
            <button
                type="button"
                onClick={bekreft}
                disabled={laster}
                className={primaryBtnCls}
            >
                {laster ? "Et øyeblikk …" : tekst.knapp}
            </button>
            {feil && (
                <Link
                    href="/timer/logg-inn"
                    className="mt-3 block text-center text-[12.5px] text-natt/55 hover:text-natt"
                >
                    Til innlogging
                </Link>
            )}
        </AuthCard>
    );
}
