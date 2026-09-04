"use client";

import { useState } from "react";
import type { Profile, Project, TimeEntry } from "@/lib/supabase/types";
import { badge, btnPrimary, card, dot, input, select } from "./ui";
import { datoVis, iDag, tall } from "./utils";

type NyEntry = Omit<TimeEntry, "id" | "created_at" | "user_id">;

type Props = {
    rader: TimeEntry[];
    projects: Project[];
    profiles: Profile[];
    userId: string;
    onLeggTil: (e: NyEntry) => Promise<boolean>;
    onSlett: (id: string) => Promise<void>;
    visToast: (msg: string) => void;
};

const GRID =
    "grid grid-cols-[84px_96px_100px_1.3fr_2fr_64px_64px_96px_36px] gap-2.5 px-5";

export default function Timeforing({
    rader,
    projects,
    profiles,
    userId,
    onLeggTil,
    onSlett,
    visToast,
}: Props) {
    const meg = profiles.find((p) => p.id === userId);
    const navn = new Map(profiles.map((p) => [p.id, p.navn]));
    const prosjekt = new Map(projects.map((p) => [p.id, p]));
    const aktive = projects.filter((p) => p.aktiv);

    const [form, setForm] = useState({
        dato: iDag(),
        project_id: "",
        timer: "",
        reise: "",
        beskrivelse: "",
        fakturerbar: true,
    });
    const [lagrer, setLagrer] = useState(false);

    const set = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) =>
        setForm((f) => ({ ...f, [k]: v }));

    async function lagre() {
        const timer = parseFloat(form.timer.replace(",", "."));
        if (!form.project_id || !form.dato || !timer || timer <= 0) {
            visToast("Fyll ut dato, prosjekt og timer");
            return;
        }
        setLagrer(true);
        const ok = await onLeggTil({
            dato: form.dato,
            project_id: form.project_id,
            timer,
            reise: parseFloat(form.reise.replace(",", ".")) || 0,
            beskrivelse: form.beskrivelse.trim() || "–",
            fakturerbar: form.fakturerbar,
        });
        setLagrer(false);
        if (ok) setForm((f) => ({ ...f, timer: "", reise: "", beskrivelse: "" }));
    }

    const sumTimer = rader.reduce((a, e) => a + Number(e.timer), 0);
    const sumReise = rader.reduce((a, e) => a + Number(e.reise), 0);

    return (
        <>
            {/* Ny føring */}
            <div className={`${card} no-print mb-[18px] px-5 py-[18px]`}>
                <div className="mb-3 flex items-baseline justify-between">
                    <p className="text-[14px] font-medium">Ny føring</p>
                    <p className="text-[12.5px] text-natt/50">
                        Føres som {meg?.navn ?? "deg"}
                    </p>
                </div>
                <div className="grid grid-cols-2 gap-2 md:grid-cols-[130px_1fr_90px_90px_2fr]">
                    <input
                        type="date"
                        value={form.dato}
                        onChange={(e) => set("dato", e.target.value)}
                        className={input}
                        aria-label="Dato"
                    />
                    <select
                        value={form.project_id}
                        onChange={(e) => set("project_id", e.target.value)}
                        className={select}
                        aria-label="Prosjekt"
                    >
                        <option value="">Velg prosjekt …</option>
                        {aktive.map((p) => (
                            <option key={p.id} value={p.id}>
                                {p.navn} · {p.kunde}
                            </option>
                        ))}
                    </select>
                    <input
                        type="number"
                        step={0.25}
                        min={0}
                        placeholder="Timer"
                        value={form.timer}
                        onChange={(e) => set("timer", e.target.value)}
                        className={input}
                        aria-label="Timer"
                    />
                    <input
                        type="number"
                        step={0.25}
                        min={0}
                        placeholder="Reise"
                        value={form.reise}
                        onChange={(e) => set("reise", e.target.value)}
                        className={input}
                        aria-label="Reisetid"
                    />
                    <input
                        type="text"
                        placeholder="Hva jobbet du med?"
                        value={form.beskrivelse}
                        onChange={(e) => set("beskrivelse", e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && lagre()}
                        className={`${input} col-span-2 md:col-span-1`}
                        aria-label="Beskrivelse"
                    />
                </div>
                <div className="mt-2.5 flex items-center gap-2.5">
                    <button
                        type="button"
                        onClick={() => set("fakturerbar", !form.fakturerbar)}
                        className={`cursor-pointer rounded-full border px-3.5 py-1.5 text-[12.5px] font-medium transition-colors ${
                            form.fakturerbar
                                ? "border-strong/40 bg-strong/8 text-strong"
                                : "border-natt/15 bg-transparent text-natt/60"
                        }`}
                    >
                        Fakturerbar: {form.fakturerbar ? "ja" : "nei"}
                    </button>
                    <button
                        onClick={lagre}
                        disabled={lagrer}
                        className={`${btnPrimary} ml-auto px-[22px] py-[9px]`}
                    >
                        {lagrer ? "Lagrer …" : "Lagre føring"}
                    </button>
                </div>
            </div>

            {/* Tabell */}
            <div className={`${card} overflow-x-auto`}>
                <div className="min-w-[900px]">
                    <div className={`${GRID} py-3 text-[12px] font-medium text-natt/50`}>
                        <span>Dato</span>
                        <span>Person</span>
                        <span>Kunde</span>
                        <span>Prosjekt</span>
                        <span>Beskrivelse</span>
                        <span className="text-right">Timer</span>
                        <span className="text-right">Reise</span>
                        <span>Fakturerbar</span>
                        <span />
                    </div>
                    {rader.length === 0 && (
                        <p className="border-t border-natt/6 px-5 py-6 text-[13px] text-natt/45">
                            Ingen føringer i valgt periode.
                        </p>
                    )}
                    {rader.map((e) => {
                        const p = prosjekt.get(e.project_id);
                        const egen = e.user_id === userId;
                        return (
                            <div
                                key={e.id}
                                className={`${GRID} items-center border-t border-natt/6 py-[11px] text-[13px] hover:bg-natt/2`}
                            >
                                <span className="text-natt/65">{datoVis(e.dato)}</span>
                                <span className="truncate">
                                    {navn.get(e.user_id) ?? "–"}
                                </span>
                                <span className="truncate text-natt/65">
                                    {p?.kunde ?? "–"}
                                </span>
                                <span className="truncate">
                                    <span
                                        className={dot}
                                        style={{ background: p?.farge ?? "#ccc" }}
                                    />
                                    {p?.navn ?? "–"}
                                </span>
                                <span className="truncate text-natt/65">
                                    {e.beskrivelse}
                                </span>
                                <span className="text-right font-medium">
                                    {tall(Number(e.timer))}
                                </span>
                                <span className="text-right text-natt/55">
                                    {Number(e.reise) ? tall(Number(e.reise)) : "–"}
                                </span>
                                <span>
                                    <span className={badge(e.fakturerbar)}>
                                        {e.fakturerbar ? "Ja" : "Nei"}
                                    </span>
                                </span>
                                {egen ? (
                                    <button
                                        onClick={() => onSlett(e.id)}
                                        aria-label="Slett føring"
                                        className="no-print h-[26px] w-[26px] cursor-pointer rounded-full border-0 bg-transparent text-[15px] text-natt/35 hover:bg-natt/6 hover:text-natt"
                                    >
                                        ×
                                    </button>
                                ) : (
                                    <span />
                                )}
                            </div>
                        );
                    })}
                    <div className={`${GRID} border-t border-natt/10 py-3 text-[13px] font-medium`}>
                        <span className="col-span-5">
                            Sum ({rader.length}{" "}
                            {rader.length === 1 ? "føring" : "føringer"})
                        </span>
                        <span className="text-right">{tall(sumTimer)}</span>
                        <span className="text-right">{tall(sumReise)}</span>
                        <span />
                        <span />
                    </div>
                </div>
            </div>
        </>
    );
}
