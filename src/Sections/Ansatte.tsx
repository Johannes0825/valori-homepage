import EmployeeCard from "@/Components/EmployeeCard";

const employees = [
    {
        name: "Hanne Kolflaath",
        role: "Gründer, daglig leder og rådgiver",
        description:
            "Rådgiver innen ledelse, innovasjon og e-helse. Tidligere toppleder og pådriver bak Helfi og Valori Care. Har flere styreverv og er frivilligleder i DNT.",
        image: "/team/hanne.jpg",
        linkedin: "https://www.linkedin.com/in/hanne-kolflaath-8898b225/",
        email: "hanne@valori.no",
    },
    {
        name: "Johannes Røsberg",
        role: "Rådgiver",
        description:
            "Analytisk og detaljfokusert rådgiver med bakgrunn fra startups, helsesektor og sterk samfunnsforståelse.",
        image: "/team/johannes.jpg",
        linkedin:
            "https://www.linkedin.com/in/johannes-r%C3%B8sberg-87b251298/",
        email: "johannes@valori.no",
    },
    {
        name: "Kathrine S. Elholt",
        role: "Sykepleier og rådgiver",
        description:
            "Sykepleier med inngående kjennskap til hvordan systemer brukes og arbeidsprosesser understøttes. Svært god formidlingsevne og lang erfaring med selskapsbygging.",
        image: "/team/kathrine.jpg",
        linkedin:
            "https://www.linkedin.com/in/kathrine-skippervik-elholt-821b5762/",
        email: "kathrine@valori.no",
    },
];

export default function Ansatte() {
    return (
        <>
            <section id="ansatte" className="py-24 bg-white">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl text-[#172C51] mb-4">
                            Vårt team
                        </h2>
                        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                            Møt de talentfulle menneskene som driver selskapet
                            vårt fremover
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {employees.map((employee, index) => (
                            <EmployeeCard key={index} {...employee} />
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
