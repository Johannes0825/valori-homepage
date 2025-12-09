import { KraftBox } from "@/Components/KraftBox";

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

const firstRow = values.slice(0, 3);
const secondRow = values.slice(3);

export default function OmOss() {
    return (
        <section id="om-oss" className="py-2 sm:py-12 bg-white">
            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl text-natt mb-4">
                            Om oss
                        </h2>
                        <p className="text-2xl text-strong mb-8">
                            Det krever vilje. Og det krever kraft.
                        </p>
                    </div>

                    <div className="prose prose-lg max-w-none mb-16">
                        <h3 className="text-2xl text-natt mb-4">
                            Vår historie
                        </h3>
                        <p className="text-slate-700 mb-6">
                            Valori ble til med vilje – og med
                            <span className="text-natt"> KRAFT</span>. Ideen
                            oppstod i Skarvheimen, da trygghet ble valgt bort
                            til fordel for verdier, integritet og troen på å
                            skape noe meningsfullt.
                        </p>
                        <p className="text-slate-700 mb-6">
                            Vi bygger verdi i skjæringspunktet mellom helse,
                            offentlig sektor, teknologi og mennesker. Vi vet hva
                            det krever å stå i endring, usikkerhet og ansvar –
                            fordi vi gjør det selv.
                        </p>
                        <p className="text-slate-700 mb-6">
                            Med over 25 års erfaring fra offentlig sektor,
                            e-helse, organisasjonsutvikling og teknologiledelse
                            har vi stått på begge sider av bordet – som leder,
                            innkjøper, rådgiver og tilbyder.
                        </p>
                        <p className="text-slate-700">
                            <span className="text-natt">Valori</span> betyr
                            verdier. For oss er de ikke til pynt – de er til
                            bruk.
                        </p>
                    </div>
                    <div className="bg-linear-to-br from-himmel to-white p-6 rounded-2xl">
                        <h3 className="text-3xl text-natt font-light my-8 text-center pb-4">
                            <strong className="font-medium">KRAFT</strong> står
                            for:
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 place-items-center">
                            {firstRow.map((value, index) => (
                                <KraftBox key={index} {...value} />
                            ))}

                            <div className="md:col-span-3 flex flex-col md:flex-row md:justify-center gap-10">
                                {secondRow.map((value, index) => (
                                    <KraftBox key={index} {...value} />
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="text-center py-8">
                        <h3 className="text-2xl text-natt mb-4">
                            Valori betyr verdier.
                        </h3>
                        <p className="text-slate-700 mb-6">
                            {/* Valori ble til med vilje – og med
                            <span className="text-natt">KRAFT</span>. Ideen */}
                            Men for oss er verdier ikke til pynt – de er til
                            bruk. KRAFT er vår rettesnor, og viljen vår motor.
                            Vi har over 25 års erfaring fra offentlig sektor,
                            e‑helse, organisasjonsutvikling og teknologiledelse.
                            Vi har sittet på begge sider av bordet – som
                            innkjøper, tilbyder, leder og rådgiver.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
