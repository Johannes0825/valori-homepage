"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, type FormEvent } from "react";
import { createClient } from "@/lib/supabase/client";
import AuthCard, { fieldCls, primaryBtnCls } from "./AuthCard";

const feilTekster: Record<string, string> = {
    "ugyldig-lenke":
        "Lenken er ugyldig eller utløpt. Be om en ny invitasjon eller tilbakestill passordet.",
};

export default function LoginForm() {
    const router = useRouter();
    const params = useSearchParams();
    const [epost, setEpost] = useState("");
    const [passord, setPassord] = useState("");
    const [feil, setFeil] = useState<string | null>(
        feilTekster[params.get("feil") ?? ""] ?? null
    );
    const [info, setInfo] = useState<string | null>(null);
    const [laster, setLaster] = useState(false);

    async function loggInn(e: FormEvent) {
        e.preventDefault();
        setFeil(null);
        setLaster(true);
        const supabase = createClient();
        const { error } = await supabase.auth.signInWithPassword({
            email: epost,
            password: passord,
        });
        setLaster(false);
        if (error) {
            setFeil("Feil e-post eller passord.");
            return;
        }
        router.replace("/timer");
        router.refresh();
    }

    async function glemtPassord() {
        if (!epost) {
            setFeil("Skriv inn e-postadressen først.");
            return;
        }
        setFeil(null);
        const supabase = createClient();
        const { error } = await supabase.auth.resetPasswordForEmail(epost, {
            redirectTo: `${window.location.origin}/timer/auth/confirm?type=recovery`,
        });
        if (error) {
            setFeil("Kunne ikke sende e-post. Prøv igjen.");
            return;
        }
        setInfo("Vi har sendt deg en e-post med lenke for å sette nytt passord.");
    }

    return (
        <AuthCard title="Logg inn" subtitle="Internverktøy for Valori AS">
            <form onSubmit={loggInn} className="flex flex-col gap-3">
                <input
                    type="email"
                    autoComplete="email"
                    required
                    placeholder="E-post"
                    value={epost}
                    onChange={(e) => setEpost(e.target.value)}
                    className={fieldCls}
                />
                <input
                    type="password"
                    autoComplete="current-password"
                    required
                    placeholder="Passord"
                    value={passord}
                    onChange={(e) => setPassord(e.target.value)}
                    className={fieldCls}
                />
                {feil && (
                    <p className="text-[13px] text-[#C05B3E]" role="alert">
                        {feil}
                    </p>
                )}
                {info && <p className="text-[13px] text-[#2E7A6A]">{info}</p>}
                <button type="submit" disabled={laster} className={primaryBtnCls}>
                    {laster ? "Logger inn …" : "Logg inn"}
                </button>
                <button
                    type="button"
                    onClick={glemtPassord}
                    className="mt-1 text-[12.5px] text-natt/55 hover:text-natt"
                >
                    Glemt passord?
                </button>
            </form>
        </AuthCard>
    );
}
