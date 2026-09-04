import Link from "next/link";
import type { ReactNode } from "react";

type ButtonProps = {
    children: ReactNode;
    href?: string;
    variant?: "primary" | "secondary";
    size?: "sm" | "md";
    className?: string;
};

const base =
    "inline-flex items-center justify-center font-medium whitespace-nowrap transition-[background-color,transform] duration-150 ease-smooth active:scale-[0.98]";

const variants = {
    primary: "bg-natt text-white hover:bg-strong hover:text-white",
    secondary: "bg-natt/5 text-natt hover:bg-natt/9 hover:text-natt",
};

const sizes = {
    sm: "text-[15px] px-5 py-2.5 rounded-[10px]",
    md: "text-base px-[26px] py-[13px] rounded-xl",
};

export default function Button({
    children,
    href = "mailto:post@valori.no",
    variant = "primary",
    size = "md",
    className = "",
}: ButtonProps) {
    const cls = `${base} ${variants[variant]} ${sizes[size]} ${className}`;
    if (href.startsWith("#")) {
        return (
            <Link href={href} className={cls}>
                {children}
            </Link>
        );
    }
    return (
        <a href={href} className={cls}>
            {children}
        </a>
    );
}
