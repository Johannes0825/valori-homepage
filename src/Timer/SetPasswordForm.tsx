"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import { createClient } from "@/lib/supabase/client";
import AuthCard, { fieldCls, primaryBtnCls } from "./AuthCard";

type Status = "sjekker" | "klar" | "ingen-sesjon";

export default function SetPasswordForm() {
    const router = useRouter();
    const [status, setStatus] = useState<Status>("sjekker");
    const [navn, setNavn] = useState("");
    const [passord, setPassord] = useState("");
    const [bekreft, setBekreft] = useState("");
    const [feil, setFeil] = useState<string | null>(null);
    const [laster, setLaster] = useState(false);

    useEffect(() => {
        const supabase = createClient();

        async function init() {
            // Fallback: lenker med tokens i URL-hash (implicit flow).
            const hash = new URLSearchParams(
                window.location.hash.replace(/^#/, "")
            );
            const accessToken = hash.get("access_token");
            const refreshToken = hash.get("refresh_token");
            if (accessToken && refreshToken) {
                await supabase.auth.setSession({
                    access_token: accessToken,
                    refresh_token: refreshToken,
                });
                window.history.replaceState(null, "", window.location.pathname);
            }

            const {
                data: { user },
            } = await supabase.auth.getUser();
            if (!user) {
                setStatus("ingen-sesjon");
                return;
            }
            const { data: profil } = await supabase
                .from("profiles")
                .select("navn")
                .eq("id", user.id)
                .maybeSingle();
            setNavn(profil?.navn ?? "");
            setStatus("klar");
        }

        init();
    }, []);

    async function lagre(e: FormEvent) {
        e.preventDefault();
        setFeil(null);
        if (passord.length < 8) {
            setFeil("Passordet må ha minst 8 tegn.");
            return;
        }
        if (passord !== bekreft) {
            setFeil("Passordene er ikke like.");
            return;
        }
        setLaster(true);
        const supabase = createClient();
        const { data, error } = await supabase.auth.updateUser({
            password: passord,
            data: { navn: navn.trim() },
        });
        if (error || !data.user) {
            setLaster(false);
            setFeil(
                error?.message?.includes("different from the old")
                    ? "Nytt passord må være forskjellig fra det gamle."
                    : "Kunne ikke lagre. Prøv igjen."
            );
            return;
        }
        if (navn.trim()) {
            await supabase
                .from("profiles")
                .update({ navn: navn.trim() })
                .eq("id", data.user.id);
        }
        router.replace("/timer");
        router.refresh();
    }

    if (status === "sjekker") {
        return (
            <AuthCard title="Sett passord">
                <p className="text-[13px] text-natt/55">Et øyeblikk …</p>
            </AuthCard>
        );
    }

    if (status === "ingen-sesjon") {
        return (
            <AuthCard
                title="Lenken virker ikke"
                subtitle="Invitasjons- eller tilbakestillingslenken er utløpt eller allerede brukt."
            >
                <Link href="/timer/logg-inn" className={primaryBtnCls}>
                    Til innlogging
                </Link>
            </AuthCard>
        );
    }

    return (
        <AuthCard
            title="Velkommen"
            subtitle="Velg et passord for å komme i gang."
        >
            <form onSubmit={lagre} className="flex flex-col gap-3">
                <input
                    type="text"
                    autoComplete="name"
                    placeholder="Visningsnavn (f.eks. Hanne)"
                    value={navn}
                    onChange={(e) => setNavn(e.target.value)}
                    className={fieldCls}
                />
                <input
                    type="password"
                    autoComplete="new-password"
                    required
                    placeholder="Nytt passord (minst 8 tegn)"
                    value={passord}
                    onChange={(e) => setPassord(e.target.value)}
                    className={fieldCls}
                />
                <input
                    type="password"
                    autoComplete="new-password"
                    required
                    placeholder="Gjenta passord"
                    value={bekreft}
                    onChange={(e) => setBekreft(e.target.value)}
                    className={fieldCls}
                />
                {feil && (
                    <p className="text-[13px] text-[#C05B3E]" role="alert">
                        {feil}
                    </p>
                )}
                <button type="submit" disabled={laster} className={primaryBtnCls}>
                    {laster ? "Lagrer …" : "Lagre og fortsett"}
                </button>
            </form>
        </AuthCard>
    );
}
