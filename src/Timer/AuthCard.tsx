import Image from "next/image";
import type { ReactNode } from "react";
import logo from "../../public/logo.png";

export const fieldCls =
    "w-full rounded-[10px] border-0 bg-[#F0F4F9] px-3.5 py-2.5 text-[14px] text-natt placeholder:text-natt/40 focus:outline-2 focus:outline-strong/35";

export const primaryBtnCls =
    "inline-flex w-full items-center justify-center rounded-full bg-natt px-5 py-2.5 text-[13.5px] font-medium text-white transition-[background-color,transform] duration-150 ease-smooth hover:bg-strong active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60";

export default function AuthCard({
    title,
    subtitle,
    children,
}: {
    title: string;
    subtitle?: string;
    children: ReactNode;
}) {
    return (
        <main className="flex min-h-screen items-center justify-center px-6 py-12">
            <div className="w-full max-w-[380px]">
                <div className="mb-6 text-center">
                    <Image
                        src={logo}
                        alt="Valori"
                        className="mx-auto mb-3 h-[22px] w-auto"
                        priority
                    />
                    <p className="text-[11.5px] text-natt/45">
                        Timeregistrering
                    </p>
                </div>
                <div className="rounded-2xl bg-white p-6 shadow-[0_12px_40px_rgba(23,44,81,0.06)]">
                    <h1 className="text-[20px] font-normal tracking-[-0.015em]">
                        {title}
                    </h1>
                    {subtitle && (
                        <p className="mt-1 text-[13px] text-natt/55">
                            {subtitle}
                        </p>
                    )}
                    <div className="mt-5">{children}</div>
                </div>
            </div>
        </main>
    );
}
