interface ReferenceCardProps {
    company: string;
    person: string;
    role: string;
    content: string;
}

export default function ReferenceCard({
    company,
    person,
    role,
    content,
}: ReferenceCardProps) {
    return (
        <article className="flex h-full flex-col rounded-3xl bg-white p-[30px]">
            <p className="mb-6 text-[15.5px] leading-[1.65] text-natt/70">
                «{content}»
            </p>

            <div className="mt-auto border-t border-natt/8 pt-4">
                <p className="text-[15px] font-medium text-natt">{person}</p>
                <p className="mt-[3px] text-[13.5px] text-natt/55">
                    {role} · {company}
                </p>
            </div>
        </article>
    );
}
