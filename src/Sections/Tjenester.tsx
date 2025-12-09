import TjenesterBox from "@/Components/TjenesterBox";
import {
    Lightbulb,
    Stethoscope,
    Rocket,
    BriefcaseBusiness,
} from "lucide-react";

const services = [
    {
        icon: Stethoscope,
        title: "E-helse & digitalisering",
        desc: "Med brukerfokus og sektorforståelse hjelper vi deg med digital transformasjon og implementering av helsetjenester.",
    },
    {
        icon: BriefcaseBusiness,
        title: "Ledelse & organisasjonsutvikling",
        desc: "Verdibasert utvikling og endring som skaper bærekraftig vekst og styrker organisasjonskulturen.",
    },
    {
        icon: Rocket,
        title: "Kommunalisering & markedsføring",
        desc: "Fra idé til synlighet og vekst. Vi hjelper deg å finne de levere ditt budskap med kraft og klarhet.",
    },
    {
        icon: Lightbulb,
        title: "Foredrag & inspirasjon",
        desc: "Hvordan snu personlig krise til samfunnsnyttige løsninger. Engasjerende foredrag som inspirerer til handling.",
    },
];

export default function Tjenester() {
    return (
        <section
            id="tjenester"
            className="py-16 max-w-[1200px] mx-auto bg-white"
        >
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl text-natt mb-4">
                        Kjerneområder
                    </h2>
                    <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                        Vi tilbyr skreddersydde løsninger innen våre fire
                        kjerneområder
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {services.map((item, i) => (
                        <TjenesterBox key={i} {...item} />
                    ))}
                </div>
            </div>
        </section>
    );
}

/* 

import { Lightbulb, Code, Rocket, Shield } from "lucide-react";
import { Page } from "../App";

interface ServicesProps {
  onNavigate: (page: Page) => void;
}

const services = [
  {
    icon: Code,
    title: "E-helse & digitalisering",
    description: "Med brukerfokus og sektorforståelse hjelper vi deg med digital transformasjon og implementering av helsetjenester."
  },
  {
    icon: Shield,
    title: "Ledelse & organisasjonsutvikling",
    description: "Verdibasert utvikling og endring som skaper bærekraftig vekst og styrker organisasjonskulturen."
  },
  {
    icon: Rocket,
    title: "Kommunalisering & markedsføring",
    description: "Fra idé til synlighet og vekst. Vi hjelper deg å finne de levere ditt budskap med kraft og klarhet."
  },
  {
    icon: Lightbulb,
    title: "Foredrag & inspirasjon",
    description: "Hvordan snu personlig krise til samfunnsnyttige løsninger. Engasjerende foredrag som inspirerer til handling."
  }
];

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
{services.map((service, index) => {
    const Icon = service.icon;
    return (
      <div
        key={index}
        className="bg-white border border-slate-200 p-8 rounded-lg hover:border-[#2E4ACA] hover:shadow-lg transition group"
      >
        <div className="w-14 h-14 bg-[#172C51] rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#2E4ACA] transition">
          <Icon className="w-7 h-7 text-white" />
        </div>
        <h3 className="text-xl text-[#172C51] mb-3">
          {service.title}
        </h3>
        <p className="text-slate-600">
          {service.description}
        </p>
      </div>
    );
  })}
</div>*/
