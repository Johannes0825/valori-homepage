type KraftBoxProps = {
    letter: string;
    title: string;
    description: string;
};

export function KraftBox({ letter, title, description }: KraftBoxProps) {
    return (
        <div className="rounded-[20px] bg-himmel px-5 py-[26px]">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-natt">
                <span className="text-[19px] font-medium text-white">
                    {letter}
                </span>
            </div>
            <h4 className="mt-4 mb-1.5 text-base font-medium text-natt">
                {title}
            </h4>
            <p className="text-[13.5px] leading-[1.55] text-natt/60">
                {description}
            </p>
        </div>
    );
}
