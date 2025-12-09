import Ansatte from "@/Sections/Ansatte";
import Footer from "@/Sections/Footer";
import Hero from "@/Sections/Hero";
import OmOss from "@/Sections/OmOss";
import Customers from "@/Sections/Customers";
import Tjenester from "@/Sections/Tjenester";

export default function Home() {
    return (
        <>
            <Hero />
            <Tjenester />
            <OmOss />
            <Customers />
            <Ansatte />
            <Footer />
        </>
    );
}
