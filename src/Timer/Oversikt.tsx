import type { Profile, Project, TimeEntry } from "@/lib/supabase/types";
import { card, dot } from "./ui";
import { datoVis, tall } from "./utils";

type Props = {
    rader: TimeEntry[];
    projects: Project[];
    profiles: Profile[];
};

function Kpi({ label, value, extra }: { label: string; value: string; extra?: string }) {
    return (
        <div className={`${card} px-[22px] py-5`}>
            <p className="text-[12.5px] text-natt/50">{label}</p>
            <p className="mt-2 text-[30px] font-normal tracking-[-0.015em]">
                {value}
                {extra && (
                    <span className="ml-1 text-[14px] text-natt/45">{extra}</span>
                )}
            </p>
        </div>
    );
}

export default function Oversikt({ rader, projects, profiles }: Props) {
    const navn = new Map(profiles.map((p) => [p.id, p.navn]));
    const sumTimer = rader.reduce((a, e) => a + Number(e.timer), 0);
    const sumReise = rader.reduce((a, e) => a + Number(e.reise), 0);
    const faktTimer = rader
        .filter((e) => e.fakturerbar)
        .reduce((a, e) => a + Number(e.timer), 0);

    const perProsjekt = projects
        .map((p) => ({
            p,
            t: rader
                .filter((e) => e.project_id === p.id)
                .reduce((a, e) => a + Number(e.timer), 0),
        }))
        .filter((x) => x.t > 0)
        .sort((a, b) => b.t - a.t);
    const maksT = Math.max(1, ...perProsjekt.map((x) => x.t));

    return (
        <>
            <div className="mb-[22px] grid grid-cols-2 gap-3.5 lg:grid-cols-4">
                <Kpi label="Timer ført" value={`${tall(sumTimer)} t`} />
                <Kpi
                    label="Fakturerbart"
                    value={`${tall(faktTimer)} t`}
                    extra={
                        sumTimer
                            ? `${Math.round((faktTimer / sumTimer) * 100)} %`
                            : "–"
                    }
                />
                <Kpi label="Reisetid" value={`${tall(sumReise)} t`} />
                <Kpi
                    label="Aktive prosjekter"
                    value={String(projects.filter((p) => p.aktiv).length)}
                />
            </div>

            <div className="grid gap-3.5 lg:grid-cols-[1.2fr_1fr]">
                <div className={`${card} px-6 py-[22px]`}>
                    <p className="mb-4 text-[14px] font-medium">
                        Timer per prosjekt
                    </p>
                    {perProsjekt.length === 0 ? (
                        <p className="text-[13px] text-natt/45">
                            Ingen føringer i valgt periode.
                        </p>
                    ) : (
                        <div className="flex flex-col gap-3.5">
                            {perProsjekt.map(({ p, t }) => (
                                <div key={p.id}>
                                    <div className="mb-[5px] flex justify-between gap-3">
                                        <span className="truncate text-[13px]">
                                            <span
                                                className={dot}
                                                style={{ background: p.farge }}
                                            />
                                            {p.navn}{" "}
                                            <span className="text-natt/45">
                                                · {p.kunde}
                                            </span>
                                        </span>
                                        <span className="shrink-0 text-[13px] font-medium">
                                            {tall(t)} t
                                        </span>
                                    </div>
                                    <div className="h-1.5 overflow-hidden rounded-full bg-himmel">
                                        <div
                                            className="h-full rounded-full"
                                            style={{
                                                background: p.farge,
                                                width: `${Math.round((t / maksT) * 100)}%`,
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className={`${card} px-6 py-[22px]`}>
                    <p className="mb-2.5 text-[14px] font-medium">
                        Siste føringer
                    </p>
                    {rader.length === 0 ? (
                        <p className="text-[13px] text-natt/45">
                            Ingen føringer i valgt periode.
                        </p>
                    ) : (
                        <div className="flex flex-col">
                            {rader.slice(0, 6).map((e) => (
                                <div
                                    key={e.id}
                                    className="flex items-baseline justify-between gap-3 border-t border-natt/6 py-[9px]"
                                >
                                    <span className="truncate text-[13px]">
                                        {e.beskrivelse || "–"}
                                    </span>
                                    <span className="shrink-0 whitespace-nowrap text-[12.5px] text-natt/50">
                                        {datoVis(e.dato)} ·{" "}
                                        {navn.get(e.user_id) ?? "–"} ·{" "}
                                        {tall(Number(e.timer))} t
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
