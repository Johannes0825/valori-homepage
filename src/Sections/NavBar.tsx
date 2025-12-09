"use client";

import Image from "next/image";
import logo from "../../public/logo.png";
import { useState } from "react";
import Button from "../Components/Button";

export default function NavBar() {
    const [isOpen, setIsOpen] = useState(false);

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        element?.scrollIntoView({ behavior: "smooth" });
        setIsOpen(false); // Lukk menyen på mobil
    };

    const handleContact = () => {
        window.location.href = "mailto:post@valori.no";
    };

    return (
        <>
            <nav className="flex justify-between absolute top-0 left-0 right-0 z-50 items-center p-5">
                <Image src={logo} alt="logo" width={150} />

                {/* Desktop menu */}
                <ul className="hidden md:flex gap-8 text-natt text-lg font-light">
                    <li
                        onClick={() => scrollToSection("tjenester")}
                        className="cursor-pointer hover:text-strong transition-colors duration-300"
                    >
                        Tjenester
                    </li>
                    <li
                        onClick={() => scrollToSection("om-oss")}
                        className="cursor-pointer hover:text-strong transition-colors duration-300"
                    >
                        Om oss
                    </li>
                    <li
                        onClick={() => scrollToSection("kunder")}
                        className="cursor-pointer hover:text-strong transition-colors duration-300"
                    >
                        Kunder
                    </li>
                    <li
                        onClick={() => scrollToSection("ansatte")}
                        className="cursor-pointer hover:text-strong transition-colors duration-300"
                    >
                        Ansatte
                    </li>
                </ul>

                <div className="hidden md:block">
                    <Button text="Kontakt" />
                </div>

                {/* Hamburger button (mobile) */}
                <button
                    className="md:hidden flex flex-col gap-1.5 w-8 h-8 justify-center"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle menu"
                >
                    <span
                        className={`block h-0.5 bg-natt transition-all duration-300 ${
                            isOpen ? "rotate-45 translate-y-2" : ""
                        }`}
                    />
                    <span
                        className={`block h-0.5 bg-natt transition-all duration-300 ${
                            isOpen ? "opacity-0" : ""
                        }`}
                    />
                    <span
                        className={`block h-0.5 bg-natt transition-all duration-300 ${
                            isOpen ? "-rotate-45 -translate-y-2" : ""
                        }`}
                    />
                </button>
            </nav>

            {/* Mobile menu */}
            <div
                className={`md:hidden fixed top-20 left-0 right-0 bg-white z-40 transition-all duration-300 ${
                    isOpen
                        ? "max-h-screen opacity-100"
                        : "max-h-0 opacity-0 overflow-hidden"
                }`}
            >
                <ul className="flex flex-col gap-4 p-5 text-natt text-lg font-light">
                    <li
                        onClick={() => scrollToSection("tjenester")}
                        className="cursor-pointer hover:text-strong transition-colors duration-300 py-2 border-b border-himmel"
                    >
                        Tjenester
                    </li>
                    <li
                        onClick={() => scrollToSection("om-oss")}
                        className="cursor-pointer hover:text-strong transition-colors duration-300 py-2 border-b border-himmel"
                    >
                        Om oss
                    </li>
                    <li
                        onClick={() => scrollToSection("ansatte")}
                        className="cursor-pointer hover:text-strong transition-colors duration-300 py-2 border-b border-himmel"
                    >
                        Ansatte
                    </li>
                    <li
                        onClick={() => scrollToSection("kunder")}
                        className="cursor-pointer hover:text-strong transition-colors duration-300 py-2 border-b border-himmel"
                    >
                        Kunder
                    </li>
                    <li className="pt-2">
                        <button className="w-full bg-natt text-white px-6 py-4 rounded hover:bg-strong transition-colors duration-300">
                            Kontakt oss
                        </button>
                    </li>
                </ul>
            </div>
        </>
    );
}
