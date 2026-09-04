import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const PUBLIC_TIMER_PATHS = ["/timer/logg-inn", "/timer/auth", "/timer/sett-passord"];

/**
 * Fornyer Supabase-sesjonen (cookies) og beskytter /timer.
 * Kjører kun for /timer/* – den offentlige nettsiden er urørt.
 */
export async function proxy(request: NextRequest) {
    let response = NextResponse.next({ request });

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
    if (!url || !key) return response;

    const supabase = createServerClient(url, key, {
        cookies: {
            getAll() {
                return request.cookies.getAll();
            },
            setAll(cookiesToSet) {
                cookiesToSet.forEach(({ name, value }) =>
                    request.cookies.set(name, value)
                );
                response = NextResponse.next({ request });
                cookiesToSet.forEach(({ name, value, options }) =>
                    response.cookies.set(name, value, options)
                );
            },
        },
    });

    // Ikke legg kode mellom createServerClient og getUser – ellers kan
    // brukere bli logget ut tilfeldig.
    const {
        data: { user },
    } = await supabase.auth.getUser();

    const { pathname } = request.nextUrl;
    const isPublic = PUBLIC_TIMER_PATHS.some((p) => pathname.startsWith(p));

    if (!user && !isPublic) {
        const loginUrl = request.nextUrl.clone();
        loginUrl.pathname = "/timer/logg-inn";
        loginUrl.search = "";
        return NextResponse.redirect(loginUrl);
    }

    if (user && pathname === "/timer/logg-inn") {
        const appUrl = request.nextUrl.clone();
        appUrl.pathname = "/timer";
        appUrl.search = "";
        return NextResponse.redirect(appUrl);
    }

    return response;
}

export const config = {
    matcher: ["/timer/:path*"],
};
