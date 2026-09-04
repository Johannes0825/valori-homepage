/** Delte Tailwind-klasser for timer-verktøyet (matcher designfilen). */

export const card = "rounded-2xl bg-white";

export const input =
    "rounded-[10px] border-0 bg-[#F0F4F9] px-3 py-[9px] text-[13px] text-natt placeholder:text-natt/40 focus:outline-2 focus:outline-strong/35";

export const select = `${input} cursor-pointer`;

export const pillSelect =
    "cursor-pointer rounded-full border border-natt/12 bg-white px-3 py-[7px] text-[13px] text-natt focus:outline-2 focus:outline-strong/35";

export const btnPrimary =
    "cursor-pointer rounded-full border-0 bg-natt px-[18px] py-2 text-[13px] font-medium text-white transition-[background-color,transform] duration-150 ease-smooth hover:bg-strong active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60";

export const btnSecondary =
    "cursor-pointer rounded-full border border-natt/12 bg-white px-4 py-2 text-[13px] font-medium text-natt transition-[background-color,transform] duration-150 hover:bg-natt/4 active:scale-[0.98]";

export const btnGhost =
    "cursor-pointer rounded-full border border-natt/12 bg-transparent px-3.5 py-1.5 text-[12.5px] font-medium text-natt transition-[background-color,transform] duration-150 hover:bg-natt/4 active:scale-[0.98]";

export function pill(aktiv: boolean) {
    return `cursor-pointer rounded-full border-0 px-3 py-[5px] text-[12.5px] font-medium transition-[background-color,transform] duration-150 active:scale-[0.98] ${
        aktiv ? "bg-natt text-white" : "bg-transparent text-natt/60"
    }`;
}

export function badge(fakt: boolean) {
    return `inline-block rounded-full px-2.5 py-0.5 text-[11.5px] font-medium ${
        fakt ? "bg-strong/10 text-strong" : "bg-natt/7 text-natt/60"
    }`;
}

export const dot = "mr-[7px] inline-block h-2 w-2 shrink-0 rounded-full";
