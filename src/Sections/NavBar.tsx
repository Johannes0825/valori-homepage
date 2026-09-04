"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "../../public/logo.png";
import Button from "../Components/Button";

const links = [
    { href: "#tjenester", label: "Tjenester" },
    { href: "#om-oss", label: "Om oss" },
    { href: "#kunder", label: "Kunder" },
    { href: "#ansatte", label: "Ansatte" },
];

export default function NavBar() {
    const [isOpen, setIsOpen] = useState(false);

    // Lukk mobilmenyen når man går til desktop-bredde
    useEffect(() => {
        const mq = window.matchMedia("(min-width: 768px)");
        const onChange = () => mq.matches && setIsOpen(false);
        mq.addEventListener("change", onChange);
        return () => mq.removeEventListener("change", onChange);
    }, []);

    return (
        <header className="fixed inset-x-0 top-0 z-50 px-4 pt-3 md:px-6 md:pt-[18px]">
            <div className="mx-auto max-w-[920px] rounded-[14px] border border-natt/6 bg-white shadow-[0_25px_60px_rgba(23,44,81,0.08)]">
                <div className="flex items-center justify-between gap-4 py-2.5 pr-3 pl-4 md:pl-[22px]">
                    <Link
                        href="#topp"
                        className="flex items-center"
                        aria-label="Valori – til toppen"
                        onClick={() => setIsOpen(false)}
                    >
                        <Image
                            src={logo}
                            alt="Valori"
                            className="block h-[26px] w-auto"
                            priority
                        />
                    </Link>

                    <nav className="hidden items-center gap-0.5 md:flex">
                        {links.map((l) => (
                            <Link
                                key={l.href}
                                href={l.href}
                                className="rounded-[10px] px-3.5 py-2 text-[15px] text-natt/72 transition-colors duration-150 ease-smooth hover:bg-natt/4 hover:text-natt active:scale-[0.98]"
                            >
                                {l.label}
                            </Link>
                        ))}
                    </nav>

                    <div className="hidden md:block">
                        <Button size="sm">Kontakt oss</Button>
                    </div>

                    <button
                        type="button"
                        className="flex h-10 w-10 items-center justify-center rounded-[10px] text-natt transition-colors hover:bg-natt/4 md:hidden"
                        onClick={() => setIsOpen((o) => !o)}
                        aria-label={isOpen ? "Lukk meny" : "Åpne meny"}
                        aria-expanded={isOpen}
                        aria-controls="mobilmeny"
                    >
                        {isOpen ? (
                            <X className="h-5 w-5" />
                        ) : (
                            <Menu className="h-5 w-5" />
                        )}
                    </button>
                </div>

                {/* Mobilmeny */}
                <div
                    id="mobilmeny"
                    className={`grid transition-[grid-template-rows,opacity] duration-300 ease-smooth md:hidden ${
                        isOpen
                            ? "grid-rows-[1fr] opacity-100"
                            : "grid-rows-[0fr] opacity-0"
                    }`}
                >
                    <div className="overflow-hidden">
                        <nav className="flex flex-col gap-1 border-t border-natt/6 p-3">
                            {links.map((l) => (
                                <Link
                                    key={l.href}
                                    href={l.href}
                                    onClick={() => setIsOpen(false)}
                                    className="rounded-[10px] px-3.5 py-2.5 text-base text-natt/80 hover:bg-natt/4 hover:text-natt"
                                >
                                    {l.label}
                                </Link>
                            ))}
                            <Button size="sm" className="mt-2 w-full">
                                Kontakt oss
                            </Button>
                        </nav>
                    </div>
                </div>
            </div>
        </header>
    );
}
