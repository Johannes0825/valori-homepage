import Image from "next/image";
import Link from "next/link";
import logo from "../../public/logo.png";

const links = [
    { href: "#tjenester", label: "Tjenester" },
    { href: "#om-oss", label: "Om oss" },
    { href: "#kunder", label: "Kunder" },
    { href: "#ansatte", label: "Ansatte" },
];

const team = [
    { email: "hanne@valori.no", name: "Hanne Kolflaath" },
    { email: "johannes@valori.no", name: "Johannes Røsberg" },
    { email: "kathrine@valori.no", name: "Kathrine S. Elholt" },
];

const linkCls =
    "text-[14.5px] text-white/60 transition-colors duration-150 hover:text-white";
const headingCls = "mb-3.5 text-sm font-medium text-white/90";

export default function Footer() {
    return (
        <footer className="mx-3 mb-3 rounded-[28px] bg-natt px-6 pt-14 pb-8 text-white md:mx-4 md:mb-4 md:rounded-[40px] md:px-14 md:pt-[72px] md:pb-9">
            <div className="mx-auto max-w-[1060px]">
                <div className="mb-12 grid grid-cols-1 gap-10 sm:grid-cols-2 md:mb-14 md:grid-cols-[2fr_1fr_1fr_1fr]">
                    <div>
                        <Image
                            src={logo}
                            alt="Valori"
                            className="mb-4 block h-7 w-auto brightness-0 invert"
                        />
                        <p className="max-w-[260px] text-[14.5px] leading-[1.6] text-white/60">
                            Verdidrevet rådgivning i møte mellom teknologi og
                            offentlig sektor.
                        </p>
                    </div>

                    <div>
                        <p className={headingCls}>Lenker</p>
                        <div className="flex flex-col gap-2.5">
                            {links.map((l) => (
                                <Link
                                    key={l.href}
                                    href={l.href}
                                    className={linkCls}
                                >
                                    {l.label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div>
                        <p className={headingCls}>Team</p>
                        <div className="flex flex-col gap-2.5">
                            {team.map((t) => (
                                <a
                                    key={t.email}
                                    href={`mailto:${t.email}`}
                                    className={linkCls}
                                >
                                    {t.name}
                                </a>
                            ))}
                        </div>
                    </div>

                    <div>
                        <p className={headingCls}>Kontakt</p>
                        <div className="flex flex-col gap-2.5">
                            <a href="mailto:post@valori.no" className={linkCls}>
                                post@valori.no
                            </a>
                            <span className="text-[14.5px] text-white/60">
                                Drøbak, Norge
                            </span>
                            <span className="text-[14.5px] text-white/60">
                                Org.nr 930 054 143
                            </span>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/15 pt-6">
                    <p className="text-[13.5px] text-white/50">
                        © {new Date().getFullYear()} Valori. Alle rettigheter
                        reservert.
                    </p>
                </div>
            </div>
        </footer>
    );
}
