import { KraftBox } from "@/Components/KraftBox";
import SectionHeading from "@/Components/SectionHeading";

const values = [
    {
        letter: "K",
        title: "Kompetanse",
        description: "Vi vet hva vi gjør – og vi deler kunnskapen videre.",
    },
    {
        letter: "R",
        title: "Raushet",
        description:
            "Vi spiller hverandre gode og tror på samarbeid fremfor konkurranse.",
    },
    {
        letter: "A",
        title: "Ambisjon",
        description: "Vi vil mer – og vi vil det for flere.",
    },
    {
        letter: "F",
        title: "Forpliktelse",
        description: "Vi lover ikke alt, men vi holder det vi lover.",
    },
    {
        letter: "T",
        title: "Tillit",
        description: "Vi bygger relasjoner som varer, og vi står i det sammen.",
    },
];

const paragraph = "mb-[22px] text-[17px] leading-[1.7] text-natt/70";

export default function OmOss() {
    return (
        <section id="om-oss" className="px-6 pt-20 pb-16 md:pt-28 md:pb-24">
            <SectionHeading
                eyebrow="Om oss"
                title={
                    <>
                        Det krever vilje.
                        <br />
                        Og det krever kraft.
                    </>
                }
                className="mx-auto max-w-[680px]"
            />

            <div className="mx-auto mt-10 max-w-[640px] md:mt-11">
                <p className={paragraph}>
                    Valori ble til med vilje – og med KRAFT. Ideen oppstod i
                    Skarvheimen, da trygghet ble valgt bort til fordel for
                    verdier, integritet og troen på å skape noe meningsfullt.
                </p>
                <p className={paragraph}>
                    Vi bygger verdi i skjæringspunktet mellom helse, offentlig
                    sektor, teknologi og mennesker. Vi vet hva det krever å stå
                    i endring, usikkerhet og ansvar – fordi vi gjør det selv.
                </p>
                <p className={paragraph}>
                    Med over 25 års erfaring fra offentlig sektor, e-helse,
                    organisasjonsutvikling og teknologiledelse har vi stått på
                    begge sider av bordet – som leder, innkjøper, rådgiver og
                    tilbyder.
                </p>
                <p className="text-[17px] leading-[1.7] text-natt">
                    Valori betyr verdier. For oss er de ikke til pynt – de er
                    til bruk.
                </p>
            </div>

            <div className="mx-auto mt-16 max-w-[1120px] md:mt-[72px]">
                <h3 className="mb-7 text-center text-[26px] font-normal tracking-[-0.01em] text-natt">
                    <strong className="font-medium">KRAFT</strong> står for
                </h3>
                <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-5">
                    {values.map((value) => (
                        <KraftBox key={value.letter} {...value} />
                    ))}
                </div>
            </div>
        </section>
    );
}
