"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const services = [
  {
    title: "Branding & Identyfikacja",
    description: "Tworzymy kompleksowe systemy identyfikacji wizualnej, które oddają charakter Twojej marki. Logo, paleta kolorów, typografia i wszystkie elementy, które budują spójny wizerunek.",
  },
  {
    title: "Web Design",
    description: "Projektujemy nowoczesne strony internetowe, które nie tylko wyglądają pięknie, ale również skutecznie realizują cele biznesowe. Responsywność i UX to nasz priorytet.",
  },
  {
    title: "Projektowanie Wnętrz",
    description: "Łączymy funkcjonalność z estetyką, tworząc przestrzenie, które inspirują. Skandynawski minimalizm spotyka się z ciepłem naturalnych materiałów.",
  },
  {
    title: "Fotografia & Stylizacja",
    description: "Profesjonalne sesje zdjęciowe produktowe i wizerunkowe. Dbamy o każdy detal, by Twoje produkty prezentowały się najlepiej.",
  },
  {
    title: "Konsultacje Kreatywne",
    description: "Pomagamy w rozwijaniu wizji i strategii kreatywnej. Wspólnie znajdziemy najlepsze rozwiązania dla Twojego projektu.",
  },
];

export function Services() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="uslugi" className="px-6 py-24 lg:py-32">
      <div className="mx-auto max-w-4xl">
        <div className="mb-16 text-center">
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-muted-foreground">
            Nasze usługi
          </p>
          <h2 className="font-serif text-4xl font-light leading-tight text-foreground md:text-5xl lg:text-6xl">
            Co oferujemy
          </h2>
        </div>

        <div className="space-y-0">
          {services.map((service, index) => (
            <div key={index} className="border-t border-border">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="flex w-full items-center justify-between py-6 text-left transition-colors hover:text-primary"
              >
                <span className="text-lg font-medium text-foreground md:text-xl">
                  {service.title}
                </span>
                {openIndex === index ? (
                  <Minus className="h-5 w-5 flex-shrink-0 text-primary" />
                ) : (
                  <Plus className="h-5 w-5 flex-shrink-0 text-muted-foreground" />
                )}
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? "max-h-48 pb-6" : "max-h-0"
                }`}
              >
                <p className="text-muted-foreground">{service.description}</p>
              </div>
            </div>
          ))}
          <div className="border-t border-border" />
        </div>
      </div>
    </section>
  );
}
