import type { Profile, Project, TimeEntry } from "@/lib/supabase/types";

export const MND_KORT = [
    "jan", "feb", "mar", "apr", "mai", "jun",
    "jul", "aug", "sep", "okt", "nov", "des",
];
export const MND_LANG = [
    "januar", "februar", "mars", "april", "mai", "juni",
    "juli", "august", "september", "oktober", "november", "desember",
];

export const FARGER: { verdi: string; navn: string }[] = [
    { verdi: "#2E4ACA", navn: "Kongeblå" },
    { verdi: "#5A7BD8", navn: "Lys blå" },
    { verdi: "#C98A46", navn: "Rav" },
    { verdi: "#3E8E7E", navn: "Grønn" },
    { verdi: "#7A5AC9", navn: "Lilla" },
];

export function tall(n: number) {
    return (Math.round(n * 100) / 100).toLocaleString("nb-NO");
}

export function datoVis(iso: string) {
    const [, m, d] = iso.split("-");
    return `${parseInt(d)}. ${MND_KORT[parseInt(m) - 1]}.`;
}

export function mndNavn(ym: string) {
    const [y, m] = ym.split("-");
    return `${MND_LANG[parseInt(m) - 1]} ${y}`;
}

export function iDag() {
    const d = new Date();
    const pad = (n: number) => String(n).padStart(2, "0");
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export type Filters = {
    person: string; // "alle" | user_id
    kunde: string; // "alle" | kundenavn
    prosjekt: string; // "alle" | project_id
    mnd: string; // "alle" | YYYY-MM
    fakt: "alle" | "ja" | "nei";
};

export function filtrer(
    entries: TimeEntry[],
    projects: Project[],
    f: Filters
) {
    const byId = new Map(projects.map((p) => [p.id, p]));
    return entries
        .filter(
            (e) =>
                (f.person === "alle" || e.user_id === f.person) &&
                (f.prosjekt === "alle" || e.project_id === f.prosjekt) &&
                (f.mnd === "alle" || e.dato.startsWith(f.mnd)) &&
                (f.fakt === "alle" || (f.fakt === "ja") === e.fakturerbar) &&
                (f.kunde === "alle" ||
                    byId.get(e.project_id)?.kunde === f.kunde)
        )
        .sort(
            (a, b) =>
                b.dato.localeCompare(a.dato) ||
                b.created_at.localeCompare(a.created_at)
        );
}

export function eksportRader(
    rader: TimeEntry[],
    projects: Project[],
    profiles: Profile[]
) {
    const p = new Map(projects.map((x) => [x.id, x]));
    const u = new Map(profiles.map((x) => [x.id, x]));
    const header = [
        "Dato", "Person", "Kunde", "Prosjekt",
        "Beskrivelse", "Timer", "Reisetid", "Fakturerbar",
    ];
    const linjer = rader.map((e) => {
        const pr = p.get(e.project_id);
        return [
            e.dato,
            u.get(e.user_id)?.navn ?? "",
            pr?.kunde ?? "",
            pr?.navn ?? "",
            e.beskrivelse,
            String(e.timer).replace(".", ","),
            String(e.reise).replace(".", ","),
            e.fakturerbar ? "Ja" : "Nei",
        ];
    });
    return [header, ...linjer];
}

export function tilCsv(linjer: string[][]) {
    return (
        "﻿" +
        linjer
            .map((r) =>
                r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(";")
            )
            .join("\n")
    );
}
