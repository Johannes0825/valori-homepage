import { Linkedin, Mail } from "lucide-react";
import Image from "next/image";

interface EmployeeProps {
    name: string;
    role: string;
    description: string;
    image: string;
    linkedin?: string;
    email?: string;
}

const iconLink =
    "flex h-10 w-10 items-center justify-center rounded-full bg-white transition-[background-color,transform] duration-150 ease-smooth hover:bg-himmel active:scale-[0.98]";

export default function EmployeeCard({
    name,
    role,
    description,
    image,
    linkedin,
    email,
}: EmployeeProps) {
    return (
        <div className="group">
            <div className="relative overflow-hidden rounded-[20px]">
                <Image
                    src={image}
                    alt={name}
                    width={600}
                    height={600}
                    sizes="(max-width: 768px) 100vw, 340px"
                    className="block aspect-square w-full object-cover transition-transform duration-300 ease-smooth group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-end justify-center gap-4 bg-linear-to-t from-natt/80 to-transparent to-60% pb-6 opacity-100 transition-opacity duration-300 ease-smooth md:opacity-0 md:group-hover:opacity-100">
                    {linkedin && (
                        <a
                            href={linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${name} på LinkedIn`}
                            className={iconLink}
                        >
                            <Linkedin className="h-[18px] w-[18px] text-natt" />
                        </a>
                    )}
                    {email && (
                        <a
                            href={`mailto:${email}`}
                            aria-label={`Send e-post til ${name}`}
                            className={iconLink}
                        >
                            <Mail className="h-[18px] w-[18px] text-natt" />
                        </a>
                    )}
                </div>
            </div>
            <h3 className="mt-[18px] mb-0.5 text-lg font-medium text-natt">
                {name}
            </h3>
            <p className="mb-2 text-[14.5px] text-strong">{role}</p>
            <p className="text-[14.5px] leading-[1.6] text-natt/60">
                {description}
            </p>
        </div>
    );
}
