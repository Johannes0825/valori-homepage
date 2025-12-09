export default function Button({
    text,
    onClick,
}: {
    text: string;
    onClick?: () => void;
}) {
    return (
        <button
            onClick={onClick}
            className="bg-natt text-white px-8 py-3 text-center cursor-pointer rounded inline-flex items-center gap-2 hover:bg-strong transition-colors duration-300"
        >
            {text}
        </button>
    );
}
