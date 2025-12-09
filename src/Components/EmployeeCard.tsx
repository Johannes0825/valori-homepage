"use client";

import { Linkedin, Mail } from "lucide-react";
import Image from "next/image";

interface EmployeeProps {
    name: string;
    role: string;
    description: string;
    image: string;
    linkedin?: string;
    email?: string;
}

export default function EmployeeCard({
    name,
    role,
    description,
    image,
    linkedin,
    email,
}: EmployeeProps) {
    return (
        <div className="group mb-12">
            <div className="relative mb-4 overflow-hidden rounded-lg">
                <Image
                    src={image}
                    alt={`${name} profile picture`}
                    width={300}
                    height={300}
                    className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-linear-to-t from-natt/80 to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6 gap-4">
                    {linkedin && (
                        <a
                            href={linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-himmel transition-colors duration-300"
                        >
                            <Linkedin className="w-5 h-5 text-natt" />
                        </a>
                    )}
                    {email && (
                        <a
                            href={`mailto:${email}`}
                            onClick={() => {
                                navigator.clipboard.writeText(email);

                                const mailto = `mailto:${email}`;

                                const opened = window.open(mailto, "_self");

                                if (!opened) {
                                    // mailto ble blokkert → vis en liten toast
                                    console.log(
                                        "Kunne ikke åpne e-postklienten, e-postadresse kopiert."
                                    );
                                }
                            }}
                            className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-himmel transition-colors duration-300"
                        >
                            <Mail className="w-5 h-5 text-natt" />
                        </a>
                    )}
                </div>
            </div>
            <h3 className="text-xl text-natt mb-1 font-semibold">{name}</h3>
            <p className="text-strong mb-2">{role}</p>
            <p className="text-slate-600 text-sm">{description}</p>
        </div>
    );
}
