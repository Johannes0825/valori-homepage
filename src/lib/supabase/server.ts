import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { supabaseEnv } from "./env";
import type { Database } from "./types";

/** Server-klient for Server Components, Route Handlers og Server Actions. */
export async function createClient() {
    const cookieStore = await cookies();
    const { url, key } = supabaseEnv();

    return createServerClient<Database>(url, key, {
        cookies: {
            getAll() {
                return cookieStore.getAll();
            },
            setAll(cookiesToSet) {
                try {
                    cookiesToSet.forEach(({ name, value, options }) =>
                        cookieStore.set(name, value, options)
                    );
                } catch {
                    // Kalles fra en Server Component – proxy.ts sørger for
                    // at sesjonen fornyes, så dette kan trygt ignoreres.
                }
            },
        },
    });
}
