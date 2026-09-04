import Ansatte from "@/Sections/Ansatte";
import Cta from "@/Sections/Cta";
import Footer from "@/Sections/Footer";
import Hero from "@/Sections/Hero";
import OmOss from "@/Sections/OmOss";
import Customers from "@/Sections/Customers";
import Tjenester from "@/Sections/Tjenester";
import ScrollToTop from "@/Components/ScrollToTop";

export default function Home() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "Valori",
        url: "https://valori.no",
        logo: "https://valori.no/logo.png",
        description:
            "Verdidrevet rådgivning innen e-helse, digitalisering og offentlig sektor",
        email: "post@valori.no",
        address: {
            "@type": "PostalAddress",
            addressLocality: "Drøbak",
            addressCountry: "NO",
        },
        founder: {
            "@type": "Person",
            name: "Hanne Kolflaath",
        },
        sameAs: ["https://www.linkedin.com/company/valori"],
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <Hero />
            <Tjenester />
            <OmOss />
            <Customers />
            <Ansatte />
            <Cta />
            <Footer />
            <ScrollToTop />
        </>
    );
}
