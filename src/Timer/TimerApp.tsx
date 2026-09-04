"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import logo from "../../public/logo.png";
import { createClient } from "@/lib/supabase/client";
import type { Profile, Project, TimeEntry } from "@/lib/supabase/types";
import Oversikt from "./Oversikt";
import Timeforing from "./Timeforing";
import Prosjekter from "./Prosjekter";
import {
    type Filters,
    eksportRader,
    filtrer,
    iDag,
    mndNavn,
    tilCsv,
} from "./utils";
import { btnPrimary, btnSecondary, pill, pillSelect } from "./ui";

type View = "oversikt" | "timer" | "prosjekter";

const VIEWS: { id: View; navn: string; tittel: string; under: string }[] = [
    {
        id: "oversikt",
        navn: "Oversikt",
        tittel: "Oversikt",
        under: "Nøkkeltall for valgt periode og filter",
    },
    {
        id: "timer",
        navn: "Timeføring",
        tittel: "Timeføring",
        under: "Registrer og administrer føringer",
    },
    {
        id: "prosjekter",
        navn: "Prosjekter",
        tittel: "Prosjekter",
        under: "Opprett og følg opp prosjekter",
    },
];

type Props = {
    userId: string;
    profiles: Profile[];
    projects: Project[];
    entries: TimeEntry[];
};

export default function TimerApp(props: Props) {
    const supabase = useMemo(() => createClient(), []);
    const [view, setView] = useState<View>("oversikt");
    const [profiles] = useState(props.profiles);
    const [projects, setProjects] = useState(props.projects);
    const [entries, setEntries] = useState(props.entries);
    const [filters, setFilters] = useState<Filters>({
        person: "alle",
        kunde: "alle",
        prosjekt: "alle",
        mnd: iDag().slice(0, 7),
        fakt: "alle",
    });
    const [toast, setToast] = useState<string | null>(null);
    const toastTimer = useRef<ReturnType<typeof setTimeout> | undefined>(
        undefined
    );

    const visToast = useCallback((msg: string) => {
        clearTimeout(toastTimer.current);
        setToast(msg);
        toastTimer.current = setTimeout(() => setToast(null), 2400);
    }, []);

    useEffect(() => () => clearTimeout(toastTimer.current), []);

    const meg = profiles.find((p) => p.id === props.userId);
    const rader = useMemo(
        () => filtrer(entries, projects, filters),
        [entries, projects, filters]
    );
    const kunder = useMemo(
        () => [...new Set(projects.map((p) => p.kunde))].sort(),
        [projects]
    );
    const maneder = useMemo(() => {
        const set = new Set(entries.map((e) => e.dato.slice(0, 7)));
        set.add(iDag().slice(0, 7));
        return [...set].sort().reverse();
    }, [entries]);

    const setFilter = (k: keyof Filters, v: string) =>
        setFilters((f) => ({ ...f, [k]: v }));

    // ---- Mutasjoner -------------------------------------------------
    async function leggTilEntry(
        input: Omit<TimeEntry, "id" | "created_at" | "user_id">
    ) {
        const { data, error } = await supabase
            .from("time_entries")
            .insert(input)
            .select()
            .single();
        if (error || !data) {
            visToast("Kunne ikke lagre føringen");
            return false;
        }
        setEntries((es) => [data, ...es]);
        visToast("Føring lagret");
        return true;
    }

    async function slettEntry(id: string) {
        const forrige = entries;
        setEntries((es) => es.filter((e) => e.id !== id));
        const { error } = await supabase
            .from("time_entries")
            .delete()
            .eq("id", id);
        if (error) {
            setEntries(forrige);
            visToast("Kunne ikke slette føringen");
            return;
        }
        visToast("Føring slettet");
    }

    async function leggTilProsjekt(
        input: Omit<Project, "id" | "created_at" | "aktiv">
    ) {
        const { data, error } = await supabase
            .from("projects")
            .insert(input)
            .select()
            .single();
        if (error || !data) {
            visToast("Kunne ikke opprette prosjektet");
            return false;
        }
        setProjects((ps) => [...ps, data]);
        visToast("Prosjekt opprettet");
        return true;
    }

    async function byttProsjektStatus(p: Project) {
        const { error } = await supabase
            .from("projects")
            .update({ aktiv: !p.aktiv })
            .eq("id", p.id);
        if (error) {
            visToast("Kunne ikke oppdatere prosjektet");
            return;
        }
        setProjects((ps) =>
            ps.map((x) => (x.id === p.id ? { ...x, aktiv: !x.aktiv } : x))
        );
    }

    // ---- Eksport ----------------------------------------------------
    function kopier() {
        const linjer = eksportRader(rader, projects, profiles);
        navigator.clipboard
            .writeText(linjer.map((r) => r.join("\t")).join("\n"))
            .then(() => visToast("Kopiert til utklippstavlen"));
    }

    function eksportCsv() {
        const csv = tilCsv(eksportRader(rader, projects, profiles));
        const a = document.createElement("a");
        a.href = URL.createObjectURL(
            new Blob([csv], { type: "text/csv;charset=utf-8" })
        );
        const mnd = filters.mnd === "alle" ? "alle" : filters.mnd;
        a.download = `valori-timer-${mnd}.csv`;
        a.click();
        URL.revokeObjectURL(a.href);
        visToast("CSV lastet ned");
    }

    function skrivUt() {
        if (view === "oversikt") {
            window.print();
        } else {
            setView("timer");
            setTimeout(() => window.print(), 150);
        }
    }

    const aktiv = VIEWS.find((v) => v.id === view)!;

    return (
        <div className="flex min-h-screen flex-col md:h-screen md:flex-row md:overflow-hidden">
            {/* Sidebar */}
            <aside className="no-print flex shrink-0 flex-col border-b border-natt/8 bg-white px-3 pt-4 pb-3 md:w-[212px] md:border-r md:border-b-0 md:pt-5 md:pb-4">
                <div className="flex items-center justify-between md:block">
                    <div>
                        <Image
                            src={logo}
                            alt="Valori"
                            className="mt-1 mb-1.5 ml-2.5 h-[22px] w-auto"
                            priority
                        />
                        <p className="mb-2 ml-2.5 text-[11.5px] text-natt/45 md:mb-[18px]">
                            Timeregistrering
                        </p>
                    </div>
                    <form action="/timer/logg-ut" method="post" className="md:hidden">
                        <button className="text-[12.5px] text-natt/55 hover:text-natt">
                            Logg ut
                        </button>
                    </form>
                </div>
                <nav className="flex gap-1 md:flex-col">
                    {VIEWS.map((v) => (
                        <button
                            key={v.id}
                            onClick={() => setView(v.id)}
                            className={`cursor-pointer rounded-full border-0 px-3.5 py-[9px] text-left text-[13.5px] text-natt transition-[background-color,transform] duration-150 hover:bg-natt/5 active:scale-[0.98] ${
                                view === v.id
                                    ? "bg-himmel font-medium"
                                    : "bg-transparent"
                            }`}
                        >
                            {v.navn}
                        </button>
                    ))}
                </nav>
                <div className="mt-auto hidden border-t border-natt/8 p-2.5 md:block">
                    <p className="text-[12.5px] font-medium">
                        {meg?.navn ?? "Valori AS"}
                    </p>
                    <p className="mt-0.5 truncate text-[11.5px] text-natt/45">
                        {meg?.epost ?? "Internverktøy · Drøbak"}
                    </p>
                    <form action="/timer/logg-ut" method="post" className="mt-2">
                        <button className="text-[12px] text-natt/55 hover:text-natt">
                            Logg ut
                        </button>
                    </form>
                </div>
            </aside>

            {/* Main */}
            <main className="flex-1 overflow-y-auto px-4 pt-6 pb-12 md:px-9 md:pt-[30px]">
                <div className="mx-auto max-w-[1080px]">
                    <div className="mb-[22px] flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                        <div>
                            <h1 className="text-[26px] font-normal tracking-[-0.015em]">
                                {aktiv.tittel}
                            </h1>
                            <p className="mt-[5px] text-[13.5px] text-natt/55">
                                {aktiv.under}
                            </p>
                        </div>
                        <div className="no-print flex flex-wrap gap-2">
                            <button onClick={kopier} className={btnSecondary}>
                                Kopier
                            </button>
                            <button onClick={eksportCsv} className={btnSecondary}>
                                Eksporter CSV
                            </button>
                            <button onClick={skrivUt} className={btnPrimary}>
                                PDF-rapport
                            </button>
                        </div>
                    </div>

                    {/* Filtre */}
                    <div className="no-print mb-[22px] flex flex-wrap items-center gap-2">
                        <select
                            value={filters.person}
                            onChange={(e) => setFilter("person", e.target.value)}
                            className={pillSelect}
                            aria-label="Person"
                        >
                            <option value="alle">Alle personer</option>
                            {profiles.map((p) => (
                                <option key={p.id} value={p.id}>
                                    {p.navn}
                                </option>
                            ))}
                        </select>
                        <select
                            value={filters.kunde}
                            onChange={(e) => setFilter("kunde", e.target.value)}
                            className={pillSelect}
                            aria-label="Kunde"
                        >
                            <option value="alle">Alle kunder</option>
                            {kunder.map((k) => (
                                <option key={k} value={k}>
                                    {k}
                                </option>
                            ))}
                        </select>
                        <select
                            value={filters.prosjekt}
                            onChange={(e) => setFilter("prosjekt", e.target.value)}
                            className={pillSelect}
                            aria-label="Prosjekt"
                        >
                            <option value="alle">Alle prosjekter</option>
                            {projects.map((p) => (
                                <option key={p.id} value={p.id}>
                                    {p.navn}
                                </option>
                            ))}
                        </select>
                        <select
                            value={filters.mnd}
                            onChange={(e) => setFilter("mnd", e.target.value)}
                            className={pillSelect}
                            aria-label="Måned"
                        >
                            <option value="alle">Alle måneder</option>
                            {maneder.map((m) => (
                                <option key={m} value={m}>
                                    {mndNavn(m)}
                                </option>
                            ))}
                        </select>
                        <div className="flex gap-0.5 rounded-full border border-natt/12 bg-white p-[3px]">
                            {(
                                [
                                    ["alle", "Alle"],
                                    ["ja", "Fakturerbar"],
                                    ["nei", "Ikke fakturerbar"],
                                ] as const
                            ).map(([v, n]) => (
                                <button
                                    key={v}
                                    onClick={() => setFilter("fakt", v)}
                                    className={pill(filters.fakt === v)}
                                >
                                    {n}
                                </button>
                            ))}
                        </div>
                    </div>

                    {view === "oversikt" && (
                        <Oversikt
                            rader={rader}
                            projects={projects}
                            profiles={profiles}
                        />
                    )}
                    {view === "timer" && (
                        <Timeforing
                            rader={rader}
                            projects={projects}
                            profiles={profiles}
                            userId={props.userId}
                            onLeggTil={leggTilEntry}
                            onSlett={slettEntry}
                            visToast={visToast}
                        />
                    )}
                    {view === "prosjekter" && (
                        <Prosjekter
                            projects={projects}
                            entries={entries}
                            onLeggTil={leggTilProsjekt}
                            onByttStatus={byttProsjektStatus}
                            visToast={visToast}
                        />
                    )}
                </div>
            </main>

            {toast && (
                <div
                    role="status"
                    className="fixed bottom-6 left-1/2 z-100 -translate-x-1/2 rounded-full bg-natt px-[22px] py-2.5 text-[13.5px] text-white shadow-[0_12px_30px_rgba(23,44,81,0.25)]"
                >
                    {toast}
                </div>
            )}
        </div>
    );
}
