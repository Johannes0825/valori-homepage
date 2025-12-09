import Image from "next/image";
import ReferenceCard from "../Components/ReferenceCard";

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
        <section id="kunder" className="py-16 bg-himmel">
            <div className="container max-w-[1200px] mx-auto px-6">
                {/* Tittel */}
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <h2 className="text-4xl md:text-5xl text-natt mb-4">
                        Kunder og samarbeidspartnere
                    </h2>
                    <p className="text-lg md:text-xl text-slate-600">
                        Valori hjelper helseteknologiselskaper, ideelle
                        organisasjoner og frivillig sektor med å lykkes i det
                        norske markedet.
                    </p>
                </div>

                {/* Logoer */}
                <div className="mb-12">
                    <h3 className="text-sm font-semibold tracking-wide text-slate-500 uppercase mb-4 text-center md:text-left">
                        Et utvalg av kundene våre
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-center">
                        {logos.map((logo) => (
                            <div
                                key={logo.name}
                                className="bg-white border border-slate-200 rounded-lg px-4 py-6 h-32 flex items-center justify-center hover:border-strong transition-colors duration-300"
                            >
                                <Image
                                    src={logo.src}
                                    alt={`${logo.name} logo`}
                                    width={140}
                                    height={60}
                                    className="object-contain max-h-full"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Styrestillinger */}
                <div className="mb-16 text-center md:text-left">
                    <h3 className="text-sm font-semibold tracking-wide text-slate-500 uppercase mb-2">
                        Styrestillinger
                    </h3>
                    <p className="text-slate-700">
                        Aible · Nasjonalforeningen Oslo Demensforening
                    </p>
                </div>

                {/* Referansekort */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <ReferenceCard key={index} {...testimonial} />
                    ))}
                </div>
            </div>
        </section>
    );
}
