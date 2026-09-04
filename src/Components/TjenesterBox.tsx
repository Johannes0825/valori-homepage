import { LucideIcon } from "lucide-react";

type ServicesProps = {
    icon: LucideIcon;
    title: string;
    desc: string;
};

export default function TjenesterBox({
    icon: Icon,
    title,
    desc,
}: ServicesProps) {
    return (
        <div className="rounded-3xl bg-white p-7 md:p-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-himmel">
                <Icon className="h-6 w-6 text-natt" strokeWidth={2} />
            </div>
            <h3 className="mt-5 mb-2.5 text-[19px] font-medium text-natt">
                {title}
            </h3>
            <p className="text-[15.5px] leading-[1.6] text-natt/60">{desc}</p>
        </div>
    );
}
