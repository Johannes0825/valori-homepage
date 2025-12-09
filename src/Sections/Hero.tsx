"use client";

import Image from "next/image";
import heroImage from "../../public/hero.jpg";
import Button from "../Components/Button";

export default function Hero() {
    return (
        <>
            <section className="bg-linear-to-br from-himmel to-white min-h-60">
                <div className="relative z-10 container max-w-6xl py-32 mx-auto px-6 md:py-35 sm:py-32">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="max-w-2xl">
                            <h1 className="text-3xl md:text-4xl mb-6 text-natt font-meduim">
                                Verdidrevet rådgivning i møte mellom teknologi
                                og offentlig sektor
                            </h1>
                            <p className="text-lg md:text-xl text-slate-600 mb-8">
                                Vi hjelper virksomheter å lykkes i
                                skjæringspunktet mellom e-helse, innovasjon og
                                mennesker – med ærlige råd og solid innsikt.
                            </p>
                            <div className="flex  gap-4">
                                <Button text="La oss finne verdien i det du gjør" />
                            </div>
                        </div>
                        <div className="relative">
                            <div className="aspect-7/6 rounded-2xl overflow-hidden shadow-2xl">
                                <Image
                                    src={heroImage}
                                    alt="Helsekonsultasjon"
                                    className="w-full h-full object-cover"
                                    width={800}
                                    height={600}
                                />
                            </div>
                            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-lys rounded-full opacity-60"></div>
                            <div className="absolute -top-6 -right-6 w-24 h-24 bg-strong rounded-full opacity-20"></div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
