import Image from "next/image";
import ReferenceCard from "../Components/ReferenceCard";
import SectionHeading from "../Components/SectionHeading";

type Testimonial = {
    company: string;
    person: string;
    role: string;
    content: string;
};

type Logo = {
    name: string;
    src: string;
};

const logos: Logo[] = [
    { name: "Youwell", src: "/logos/youwell.png" },
    { name: "KMD", src: "/logos/kmd.png" },
    { name: "DigiRehab", src: "/logos/digirehab.png" },
    { name: "DNT", src: "/logos/dnt.png" },
    { name: "EHiN", src: "/logos/ehin.png" },
];

const boardPositions = ["Aible", "Nasjonalforeningen Oslo Demensforening"];

const testimonials: Testimonial[] = [
    {
        company: "Youwell",
        person: "Øyvind Grimsgaard",
        role: "Daglig leder",
        content:
            "Hanne har vært en viktig ressurs i markedsstrategi, anbud og kommersialisering – alltid med høy kvalitet, stor arbeidskapasitet og dokumenterte resultater.",
    },
    {
        company: "DigiRehab",
        person: "Jørn Torp-Nango",
        role: "Markedssjef Norge",
        content:
            "Valori har vært en viktig suksessfaktor i vår norske etablering og bidratt til solid gjennomslagskraft i markedet gjennom innsiktsbasert og strategisk kommunikasjon.",
    },
    {
        company: "KMD",
        person: "Randi Jørgensen",
        role: "Business Line Director, Energy & Utility",
        content:
            "Valori har gitt oss verdifull innsikt i det norske helselandskapet og åpnet viktige dører inn mot nye potensielle kunder gjennom sitt sterke nettverk.",
    },
];

export default function Customers() {
    return (
        <section
            id="kunder"
            className="mx-3 rounded-[32px] bg-himmel px-5 py-16 md:mx-4 md:rounded-[48px] md:px-6 md:py-24"
        >
            <div className="mx-auto max-w-[1060px]">
                <SectionHeading
                    eyebrow="Kunder"
                    title="Kunder og samarbeidspartnere"
                    lead="Valori hjelper helseteknologiselskaper, ideelle organisasjoner og frivillig sektor med å lykkes i det norske markedet."
                    leadMaxWidth="max-w-[560px]"
                    className="mb-10 md:mb-[52px]"
                />

                {/* Logoer */}
                <ul className="mb-8 grid grid-cols-2 gap-3.5 sm:grid-cols-3 md:mb-11 lg:grid-cols-5">
                    {logos.map((logo) => (
                        <li
                            key={logo.name}
                            className="flex h-24 items-center justify-center rounded-2xl bg-white p-4"
                        >
                            <Image
                                src={logo.src}
                                alt={logo.name}
                                width={120}
                                height={44}
                                className="h-auto max-h-11 w-auto max-w-[120px] object-contain opacity-85 transition-opacity duration-150 hover:opacity-100"
                            />
                        </li>
                    ))}
                </ul>

                {/* Styrestillinger */}
                <p className="mb-8 text-center text-sm text-natt/55 md:mb-11">
                    <span className="font-medium text-gull">
                        Styrestillinger
                    </span>
                    {boardPositions.map((b) => (
                        <span key={b}>
                            &nbsp;&nbsp;·&nbsp;&nbsp;{b}
                        </span>
                    ))}
                </p>

                {/* Referanser */}
                <div className="grid gap-4 md:grid-cols-3 md:gap-5">
                    {testimonials.map((t) => (
                        <ReferenceCard key={t.person} {...t} />
                    ))}
                </div>
            </div>
        </section>
    );
}
