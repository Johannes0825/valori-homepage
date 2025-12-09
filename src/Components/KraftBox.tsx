type KraftBoxProps = {
    letter: string;
    title: string;
    description: string;
};

export function KraftBox({ letter, title, description }: KraftBoxProps) {
    return (
        <div className="flex flex-col items-center text-center h-full">
            <div className="w-20 h-20 bg-natt rounded-full flex items-center justify-center mb-6 shrink-0">
                <span className="text-4xl text-white">{letter}</span>
            </div>

            <h4 className="text-xl text-natt min-h-14">{title}</h4>

            <p className="text-slate-600 w-[210px]">{description}</p>
        </div>
    );
}
