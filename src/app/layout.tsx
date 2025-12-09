import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import NavBar from "@/Sections/NavBar";
import "./globals.css";

const dmSansSpecific = DM_Sans({
    subsets: ["latin"],
    display: "swap",
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    style: ["normal", "italic"],
});

export const metadata: Metadata = {
    title: {
        default:
            "Valori - Verdidrevet rådgivning i e-helse og offentlig sektor",
        template: "%s | Valori",
    },
    description:
        "Valori tilbyr rådgivning innen e-helse, digitalisering, ledelse og organisasjonsutvikling. Over 25 års erfaring med offentlig sektor og helseteknologi.",
    keywords: [
        "e-helse",
        "digitalisering",
        "helseteknologi",
        "rådgivning",
        "offentlig sektor",
        "ledelse",
        "organisasjonsutvikling",
        "anbud",
        "markedsføring",
        "Norge",
        "Oslo",
    ],
    authors: [{ name: "Valori" }],
    creator: "Valori",
    publisher: "Valori",
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    openGraph: {
        type: "website",
        locale: "nb_NO",
        url: "https://valori.no",
        siteName: "Valori",
        title: "Valori - Verdidrevet rådgivning i e-helse og offentlig sektor",
        description:
            "Valori tilbyr rådgivning innen e-helse, digitalisering, ledelse og organisasjonsutvikling. Over 25 års erfaring med offentlig sektor og helseteknologi.",
        images: [
            {
                url: "https://valori.no/og-image.jpg",
                width: 1200,
                height: 630,
                alt: "Valori - Verdidrevet rådgivning",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Valori - Verdidrevet rådgivning i e-helse og offentlig sektor",
        description:
            "Valori tilbyr rådgivning innen e-helse, digitalisering, ledelse og organisasjonsutvikling.",
        images: ["https://valori.no/og-image.jpg"],
    },
    alternates: {
        canonical: "https://valori.no",
    },
    metadataBase: new URL("https://valori.no"),
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="nb" className={dmSansSpecific.className}>
            <body>
                <NavBar />
                {children}
            </body>
        </html>
    );
}
