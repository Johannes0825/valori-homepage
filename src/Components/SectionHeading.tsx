import type { ReactNode } from "react";

type SectionHeadingProps = {
    eyebrow: string;
    title: ReactNode;
    lead?: ReactNode;
    leadMaxWidth?: string;
    className?: string;
};

export default function SectionHeading({
    eyebrow,
    title,
    lead,
    leadMaxWidth = "max-w-[480px]",
    className = "",
}: SectionHeadingProps) {
    return (
        <div className={`text-center ${className}`}>
            <p className="mb-3.5 text-[13px] font-medium tracking-[0.02em] text-gull">
                {eyebrow}
            </p>
            <h2 className="text-[32px] font-normal leading-tight tracking-[-0.015em] text-natt md:text-[42px]">
                {title}
            </h2>
            {lead && (
                <p
                    className={`mx-auto mt-3.5 text-[17px] leading-[1.55] text-natt/60 ${leadMaxWidth}`}
                >
                    {lead}
                </p>
            )}
        </div>
    );
}
