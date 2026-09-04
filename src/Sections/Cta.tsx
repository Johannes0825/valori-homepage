import Button from "../Components/Button";

export default function Cta() {
    return (
        <section className="relative overflow-hidden px-6 py-20 text-center md:py-[130px]">
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_65%_60%_at_50%_55%,rgba(46,74,202,0.09),rgba(46,74,202,0.04)_45%,transparent_72%)]"
            />
            <div className="relative mx-auto max-w-[640px]">
                <h2 className="text-balance text-[34px] font-normal leading-[1.12] tracking-[-0.015em] text-natt md:text-[46px]">
                    Klar til å finne verdien i det du gjør?
                </h2>
                <p className="mx-auto mt-5 max-w-[460px] text-[17px] leading-[1.55] text-natt/60">
                    Ta kontakt for en uforpliktende prat om hvor dere står – og
                    hvor dere vil.
                </p>
                <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-5 md:mt-[34px]">
                    <Button>Ta kontakt</Button>
                    <a
                        href="mailto:post@valori.no"
                        className="border-b border-natt/20 text-[15px] text-natt/60 transition-colors duration-150 hover:border-natt/60 hover:text-natt"
                    >
                        post@valori.no
                    </a>
                </div>
            </div>
        </section>
    );
}
