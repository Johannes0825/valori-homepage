import Image from "next/image";
import heroImage from "../../public/hero.jpg";
import Button from "../Components/Button";

export default function Hero() {
    return (
        <section
            id="topp"
            className="relative overflow-hidden px-6 pt-32 pb-16 md:pt-[190px] md:pb-[110px]"
        >
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_40%,rgba(46,74,202,0.08),rgba(46,74,202,0.035)_45%,transparent_72%)]"
            />
            <div className="relative mx-auto grid max-w-[1060px] items-center gap-10 md:grid-cols-[1.1fr_1fr] md:gap-14">
                <div>
                    <h1 className="text-balance text-[34px] font-normal leading-[1.1] tracking-[-0.015em] text-natt sm:text-[42px] lg:text-[50px]">
                        Verdidrevet rådgivning i møte mellom teknologi og
                        offentlig sektor
                    </h1>
                    <p className="text-pretty mt-6 max-w-[500px] text-lg leading-[1.55] text-natt/60">
                        Vi hjelper virksomheter å lykkes i skjæringspunktet
                        mellom e-helse, innovasjon og mennesker – med ærlige råd
                        og solid innsikt.
                    </p>
                    <div className="mt-8 flex flex-wrap gap-3 md:mt-[34px]">
                        <Button>La oss finne verdien i det du gjør</Button>
                        <Button href="#tjenester" variant="secondary">
                            Se tjenestene
                        </Button>
                    </div>
                    <p className="mt-5 text-sm text-natt/40">
                        Over 25 års erfaring fra offentlig sektor og e-helse
                    </p>
                </div>
                <Image
                    src={heroImage}
                    alt="Helsekonsultasjon"
                    priority
                    sizes="(max-width: 768px) 100vw, 500px"
                    className="block aspect-7/6 w-full rounded-3xl object-cover"
                />
            </div>
        </section>
    );
}
