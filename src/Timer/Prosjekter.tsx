"use client";

import { useState } from "react";
import type { Project, TimeEntry } from "@/lib/supabase/types";
import { btnGhost, btnPrimary, card, dot, input, select } from "./ui";
import { FARGER, tall } from "./utils";

type NyttProsjekt = Omit<Project, "id" | "created_at" | "aktiv">;

type Props = {
    projects: Project[];
    entries: TimeEntry[];
    onLeggTil: (p: NyttProsjekt) => Promise<boolean>;
    onByttStatus: (p: Project) => Promise<void>;
    visToast: (msg: string) => void;
};

export default function Prosjekter({
    projects,
    entries,
    onLeggTil,
    onByttStatus,
    visToast,
}: Props) {
    const [form, setForm] = useState({
        navn: "",
        kunde: "",
        timepris: "",
        ramme: "",
        farge: FARGER[0].verdi,
    });
    const [lagrer, setLagrer] = useState(false);

    const set = (k: keyof typeof form, v: string) =>
        setForm((f) => ({ ...f, [k]: v }));

    async function opprett() {
        if (!form.navn.trim() || !form.kunde.trim()) {
            visToast("Fyll ut navn og kunde");
            return;
        }
        setLagrer(true);
        const ok = await onLeggTil({
            navn: form.navn.trim(),
            kunde: form.kunde.trim(),
            timepris: parseFloat(form.timepris.replace(",", ".")) || 0,
            ramme: parseFloat(form.ramme.replace(",", ".")) || 0,
            farge: form.farge,
        });
        setLagrer(false);
        if (ok)
            setForm({
                navn: "",
                kunde: "",
                timepris: "",
                ramme: "",
                farge: FARGER[0].verdi,
            });
    }

    const sortert = [...projects].sort(
        (a, b) => Number(b.aktiv) - Number(a.aktiv) || a.navn.localeCompare(b.navn, "nb")
    );

    return (
        <>
            <div className={`${card} no-print mb-[18px] px-5 py-[18px]`}>
                <p className="mb-3 text-[14px] font-medium">Nytt prosjekt</p>
                <div className="grid grid-cols-2 gap-2 md:grid-cols-[1.4fr_1fr_110px_110px_130px_auto]">
                    <input
                        type="text"
                        placeholder="Prosjektnavn"
                        value={form.navn}
                        onChange={(e) => set("navn", e.target.value)}
                        className={input}
                        aria-label="Prosjektnavn"
                    />
                    <input
                        type="text"
                        placeholder="Kunde"
                        value={form.kunde}
                        onChange={(e) => set("kunde", e.target.value)}
                        className={input}
                        aria-label="Kunde"
                    />
                    <input
                        type="number"
                        min={0}
                        placeholder="Timepris"
                        value={form.timepris}
                        onChange={(e) => set("timepris", e.target.value)}
                        className={input}
                        aria-label="Timepris"
                    />
                    <input
                        type="number"
                        min={0}
                        placeholder="Timeramme"
                        value={form.ramme}
                        onChange={(e) => set("ramme", e.target.value)}
                        className={input}
                        aria-label="Timeramme"
                    />
                    <select
                        value={form.farge}
                        onChange={(e) => set("farge", e.target.value)}
                        className={select}
                        aria-label="Farge"
                    >
                        {FARGER.map((f) => (
                            <option key={f.verdi} value={f.verdi}>
                                {f.navn}
                            </option>
                        ))}
                    </select>
                    <button
                        onClick={opprett}
                        disabled={lagrer}
                        className={`${btnPrimary} px-5 py-[9px]`}
                    >
                        {lagrer ? "Oppretter …" : "Opprett"}
                    </button>
                </div>
            </div>

            {sortert.length === 0 ? (
                <p className="text-[13px] text-natt/45">
                    Ingen prosjekter ennå – opprett det første over.
                </p>
            ) : (
                <div className="grid gap-3.5 md:grid-cols-2">
                    {sortert.map((p) => {
                        const brukt = entries
                            .filter((e) => e.project_id === p.id)
                            .reduce((a, e) => a + Number(e.timer), 0);
                        const ramme = Number(p.ramme);
                        const pct = ramme
                            ? Math.min(100, Math.round((brukt / ramme) * 100))
                            : 0;
                        return (
                            <div key={p.id} className={`${card} px-[22px] py-5`}>
                                <div className="mb-1 flex items-center gap-2">
                                    <span
                                        className={dot}
                                        style={{ background: p.farge }}
                                    />
                                    <p className="truncate text-[15px] font-medium">
                                        {p.navn}
                                    </p>
                                    <span
                                        className={`ml-auto shrink-0 rounded-full px-2.5 py-0.5 text-[11.5px] font-medium ${
                                            p.aktiv
                                                ? "bg-[rgba(62,142,126,0.12)] text-[#2E7A6A]"
                                                : "bg-natt/7 text-natt/55"
                                        }`}
                                    >
                                        {p.aktiv ? "Aktiv" : "Avsluttet"}
                                    </span>
                                </div>
                                <p className="mb-3.5 text-[13px] text-natt/55">
                                    {p.kunde} ·{" "}
                                    {Number(p.timepris).toLocaleString("nb-NO")}{" "}
                                    kr/t
                                </p>
                                <div className="mb-[5px] flex justify-between text-[12.5px] text-natt/55">
                                    <span>
                                        {tall(brukt)} av {ramme ? tall(ramme) : "–"} t
                                    </span>
                                    <span>{ramme ? `${pct} %` : ""}</span>
                                </div>
                                <div className="mb-3.5 h-1.5 overflow-hidden rounded-full bg-himmel">
                                    <div
                                        className="h-full rounded-full"
                                        style={{
                                            width: `${pct}%`,
                                            background:
                                                pct >= 100 ? "#C05B3E" : p.farge,
                                        }}
                                    />
                                </div>
                                <button
                                    onClick={() => onByttStatus(p)}
                                    className={`${btnGhost} no-print`}
                                >
                                    {p.aktiv ? "Avslutt prosjekt" : "Gjenåpne"}
                                </button>
                            </div>
                        );
                    })}
                </div>
            )}
        </>
    );
}
