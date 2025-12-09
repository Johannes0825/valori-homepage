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
        <article className="bg-white p-8 rounded-lg shadow-sm flex flex-col h-full hover:shadow-md transition-shadow duration-300">
            <p className="text-slate-700 mb-6 italic">{content}</p>

            <div className="mt-auto border-t border-slate-200 pt-4">
                <div className="text-natt font-semibold">{person}</div>
                <div className="text-sm text-slate-600">
                    {role} · {company}
                </div>
            </div>
        </article>
    );
}
