import NavBar from "@/Sections/NavBar";

export default function SiteLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <NavBar />
            {children}
        </>
    );
}
