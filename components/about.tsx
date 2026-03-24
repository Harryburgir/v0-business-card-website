"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

export function About() {
  const [showCollab, setShowCollab] = useState(false);

  return (
    <section id="o-nas" className="relative">

      {/* ── Zdjęcie tło z tekstem ── */}
      <div className="relative min-h-[90vh] flex items-center">
        {/* Zdjęcie tło */}
        <div className="absolute inset-0">
          <Image
            src="/images/about-bg.jpg"
            alt="Śpiące niemowlę w kremowym pajacyku La de Bébé mini"
            fill
            className="object-cover object-center"
            sizes="100vw"
          />
          {/* Nakładka spójna z hero — gradient różowo-kremowy */}
          <div className="absolute inset-0 bg-gradient-to-r from-pink-50/85 via-rose-50/70 to-pink-50/30" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-pink-50/60" />
        </div>

        {/* Treść na zdjęciu */}
        <div className="relative mx-auto max-w-7xl w-full px-6 py-32 lg:py-40">
          <div className="max-w-2xl">
            <p className="mb-4 text-sm uppercase tracking-[0.3em] text-rose-700/70 drop-shadow-sm">
              O nas
            </p>
            <h2 className="font-serif text-4xl font-light leading-tight text-rose-900 drop-shadow-sm md:text-5xl lg:text-6xl">
              <span className="block text-balance">Stworzone z miłości</span>
              <span className="block text-balance">do najmłodszych</span>
            </h2>
            <p className="mt-8 text-lg leading-relaxed text-rose-900/75 drop-shadow-sm">
              La de Bébé mini to marka stworzona z myślą o dzieciach, które dopiero przychodzą na świat
              oraz o maluszkach w pierwszym roku życia. Wierzymy, że pierwsze ubranka powinny być nie tylko piękne,
              ale przede wszystkim delikatne i bezpieczne dla wrażliwej skóry dziecka.
            </p>
            <p className="mt-6 text-lg leading-relaxed text-rose-900/75 drop-shadow-sm">
              W naszej ofercie znajdują się starannie wybrane ubranka wykonane z naturalnych tkanin,
              które nie są barwione chemicznie. Stawiamy na materiały przyjazne dla skóry, oddychające
              i komfortowe, aby zapewnić maluszkom wygodę już od pierwszych dni życia.
            </p>

            {/* Przycisk rozwijający szczegóły współpracy */}
            <button
              onClick={() => setShowCollab(!showCollab)}
              className="mt-10 inline-flex items-center gap-2 self-start border border-rose-300/60 bg-white/60 backdrop-blur-sm px-6 py-3 text-sm font-medium uppercase tracking-[0.15em] text-rose-800 transition-all hover:bg-white/80 hover:border-rose-400/80 shadow-sm"
            >
              <span>Poznaj naszą współpracę z Olą Tomalą</span>
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-300 ${showCollab ? "rotate-180" : ""}`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* ── Sekcja kolaboracji (rozwijana) ── */}
      <div
        className={`bg-warm/40 transition-all duration-500 ease-in-out overflow-hidden ${
          showCollab ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 items-center">
            {/* Text side */}
            <div className="flex flex-col justify-center">
              <p className="mb-4 text-sm uppercase tracking-[0.3em] text-muted-foreground">
                Kolaboracja
              </p>
              <h3 className="font-serif text-4xl font-light leading-tight text-foreground md:text-5xl">
                <span className="block text-balance">Stworzone razem</span>
                <span className="block text-balance font-medium text-primary">z Olą Tomalą</span>
              </h3>
              <p className="mt-8 text-lg leading-relaxed text-muted-foreground">
                Wszystkie ubranka w naszej kolekcji powstały we współpracy z Olą Tomalą —
                popularną influencerką i przyszłą mamą, znaną m.in. z programów „Love Island"
                i „Królowa Przetrwania". Wspólnie tworzymy kolekcję, która łączy styl z funkcjonalnością.
              </p>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                Ola, pochodząca ze Świdnicy instruktorka jazdy konnej, doskonale rozumie potrzeby
                aktywnych mam. Jej naturalność i autentyczność idealnie wpisują się w filozofię
                naszej marki — piękno w prostocie i troska o najmłodszych.
              </p>
              <div className="mt-10 border-t border-warm pt-8">
                <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-1">
                  Współpraca
                </p>
                <p className="font-serif text-2xl font-light text-foreground">
                  Ola Tomala
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Influencerka &amp; przyszła mama
                </p>
              </div>
            </div>

            {/* Image side */}
            <div className="relative aspect-[3/4] sm:aspect-[4/5] overflow-hidden">
              <Image
                src="/images/ola-tomala-collaboration.jpg"
                alt="Ola Tomala — influencerka i przyszła mama, współtwórczyni kolekcji La de Bébé mini"
                fill
                className="object-cover object-center"
              />
              <div className="absolute bottom-6 left-6 bg-background/95 backdrop-blur-sm px-5 py-4 shadow-lg">
                <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-1">
                  Kolekcja stworzona we współpracy z
                </p>
                <p className="font-serif text-xl font-medium text-primary">
                  Ola Tomala
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Trzy filary ── */}
      <div className="bg-warm/40 border-t border-border/40">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="border-t border-warm pt-8">
              <span className="font-serif text-5xl font-light text-primary">01</span>
              <h3 className="mt-4 text-lg font-medium uppercase tracking-wide text-foreground">
                Naturalne tkaniny
              </h3>
              <p className="mt-3 text-muted-foreground">
                Starannie wyselekcjonowane materiały bez barwników chemicznych. Bezpieczne dla najdelikatniejszej skóry.
              </p>
            </div>
            <div className="border-t border-warm pt-8">
              <span className="font-serif text-5xl font-light text-primary">02</span>
              <h3 className="mt-4 text-lg font-medium uppercase tracking-wide text-foreground">
                Subtelny design
              </h3>
              <p className="mt-3 text-muted-foreground">
                Piękne, unikalne wzory wybrane we współpracy z{" "}
                <span className="font-medium text-foreground">Olą Tomalą</span>.
              </p>
            </div>
            <div className="border-t border-warm pt-8">
              <span className="font-serif text-5xl font-light text-primary">03</span>
              <h3 className="mt-4 text-lg font-medium uppercase tracking-wide text-foreground">
                Komfort od pierwszych dni
              </h3>
              <p className="mt-3 text-muted-foreground">
                Funkcjonalne konstrukcje ułatwiające czynności dnia codziennego.
              </p>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}

