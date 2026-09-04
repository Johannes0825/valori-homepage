import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Timeregistrering",
    robots: { index: false, follow: false },
};

export default function TimerLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <div className="min-h-screen bg-[#F6F8FB] text-natt">{children}</div>;
}
