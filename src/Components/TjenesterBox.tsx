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
        <div className="bg-white border col-span-1 border-slate-200 p-8 rounded-lg hover:border-strong hover:shadow-lg transition group">
            <div className="w-14 h-14 bg-natt rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#2E4ACA] transition">
                <Icon className="w-7 h-7 text-white" />
            </div>

            <h3 className="text-xl text-natt mb-3">{title}</h3>
            <p className="text-slate-600">{desc}</p>
        </div>
    );
}
