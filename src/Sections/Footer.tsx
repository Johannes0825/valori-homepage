"use client";

import { Mail, Building2, MapPin } from "lucide-react";
import Image from "next/image";
import logo from "../../public/logo.png";

export default function Footer() {
    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        element?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <footer className="bg-natt text-white py-16">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    <div>
                        <Image
                            src={logo}
                            alt="Valori logo"
                            width={150}
                            className="mb-4 brightness-0 invert"
                        />
                        <p className="text-slate-300">
                            Verdidrevet rådgivning i møte mellom teknologi og
                            offentlig sektor.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-lg mb-4 font-semibold">Lenker</h3>
                        <ul className="space-y-2 text-slate-300">
                            <li>
                                <button
                                    onClick={() => scrollToSection("tjenester")}
                                    className="hover:text-lys transition-colors  cursor-pointer duration-300"
                                >
                                    Tjenester
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => scrollToSection("om-oss")}
                                    className="hover:text-lys transition-colors  cursor-pointer duration-300"
                                >
                                    Om oss
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => scrollToSection("ansatte")}
                                    className="hover:text-lys transition-colors  cursor-pointer duration-300"
                                >
                                    Ansatte
                                </button>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg mb-4 font-semibold">Team</h3>
                        <ul className="space-y-2 text-slate-300">
                            <li>
                                <a
                                    href="mailto:hanne@valori.no"
                                    className="hover:text-lys transition-colors  cursor-pointer duration-300"
                                >
                                    Hanne Kolflaath
                                </a>
                            </li>
                            <li>
                                <a
                                    href="mailto:johannes@valori.no"
                                    className="hover:text-lys transition-colors  cursor-pointer duration-300"
                                >
                                    Johannes Røsberg
                                </a>
                            </li>
                            <li>
                                <a
                                    href="mailto:kathrine@valori.no"
                                    className="hover:text-lys transition-colors  cursor-pointer duration-300"
                                >
                                    Kathrine S. Elholt
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg mb-4 font-semibold">Kontakt</h3>
                        <ul className="space-y-3 text-slate-300">
                            <li className="flex items-center gap-2">
                                <Mail className="w-5 h-5" />
                                <a
                                    href="mailto:post@valori.no"
                                    className="hover:text-lys transition-colors duration-300"
                                >
                                    post@valori.no
                                </a>
                            </li>
                            <li className="flex items-center gap-2">
                                <MapPin className="w-5 h-5" />
                                <span>Drøbak, Norge</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Building2 className="w-5 h-5" />
                                <span>930 054 143</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-strong/30 pt-8 text-center text-slate-300">
                    <p>&copy; 2025 Valori. Alle rettigheter reservert.</p>
                </div>
            </div>
        </footer>
    );
}
