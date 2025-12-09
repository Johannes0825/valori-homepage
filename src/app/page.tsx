import Ansatte from "@/Sections/Ansatte";
import Hero from "@/Sections/Hero";
import OmOss from "@/Sections/OmOss";
import Tjenester from "@/Sections/Tjenester";

export default function Home() {
    return (
        <>
            <Hero />
            <Tjenester />
            <OmOss />
            <Ansatte />
        </>
    );
}
