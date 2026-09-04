import TjenesterBox from "@/Components/TjenesterBox";
import SectionHeading from "@/Components/SectionHeading";
import {
    FileCheck,
    Stethoscope,
    Rocket,
    BriefcaseBusiness,
} from "lucide-react";

const services = [
    {
        icon: Stethoscope,
        title: "E-helse og digitalisering",
        desc: "Med over 25 års erfaring i norsk e-helse hjelper vi deg å lykkes med digitale satsinger – fra strategi og innsikt til implementering, anbud og gevinstrealisering.",
    },
    {
        icon: BriefcaseBusiness,
        title: "Ledelse og organisasjonsutvikling",
        desc: "Verdibasert ledelse, endring og kulturbygging. Vi støtter dere med interimledelse, prosessledelse og lederstøtte som styrker både teamet og retningen.",
    },
    {
        icon: Rocket,
        title: "Kommersialisering og markedsføring",
        desc: "Fra idé til synlighet og vekst. Vi hjelper deg å forstå markedet, spisse budskapet, posisjonere deg tydelig og bygge en merkevare som beslutningstakere faktisk lytter til.",
    },
    {
        icon: FileCheck,
        title: "Anbud og offentlige anskaffelser",
        desc: "Vi hjelper deg å forstå spillet – og vinne det. Med dyp innsikt i regelverk, sektorlogikk og beslutningsprosesser bistår vi med anbudsstrategi, skrivebistand, kvalitetssikring og posisjonering.",
    },
];

export default function Tjenester() {
    return (
        <section
            id="tjenester"
            className="mx-3 rounded-[32px] bg-himmel px-5 py-16 md:mx-4 md:rounded-[48px] md:px-6 md:py-24"
        >
            <div className="mx-auto max-w-[1060px]">
                <SectionHeading
                    eyebrow="Tjenester"
                    title="Fire kjerneområder"
                    lead="Skreddersydd rådgivning – fra strategi og innsikt til gjennomføring."
                    className="mb-10 md:mb-14"
                />
                <div className="grid gap-4 md:grid-cols-2 md:gap-5">
                    {services.map((item) => (
                        <TjenesterBox key={item.title} {...item} />
                    ))}
                </div>
            </div>
        </section>
    );
}
