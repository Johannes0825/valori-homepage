"use client";

import { createBrowserClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";
import { supabaseEnv } from "./env";
import type { Database } from "./types";

let client: SupabaseClient<Database> | undefined;

/** Én delt browser-klient (cookies deles med server-siden via @supabase/ssr). */
export function createClient() {
    if (client) return client;
    const { url, key } = supabaseEnv();
    client = createBrowserClient<Database>(url, key);
    return client;
}
