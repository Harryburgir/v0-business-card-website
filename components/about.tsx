import Image from "next/image";

export function About() {
  return (
    <section id="o-nas" className="bg-warm/40 px-6 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl">

        {/* ── Wiersz 1: O nas ── */}
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="relative aspect-[4/5] overflow-hidden">
            <Image
              src="/images/about-section.jpg"
              alt="Ubranka La de Bébé mini — delikatne materiały dla niemowląt"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col justify-center">
            <p className="mb-4 text-sm uppercase tracking-[0.3em] text-muted-foreground">
              O nas
            </p>
            <h2 className="font-serif text-4xl font-light leading-tight text-foreground md:text-5xl lg:text-6xl">
              <span className="block text-balance">Stworzone z miłości</span>
              <span className="block text-balance">do najmłodszych</span>
            </h2>
            <p className="mt-8 text-lg leading-relaxed text-muted-foreground">
              La de Bébé mini to marka stworzona z myślą o dzieciach, które dopiero przychodzą na świat
              oraz o maluszkach w pierwszym roku życia. Wierzymy, że pierwsze ubranka powinny być nie tylko piękne,
              ale przede wszystkim delikatne i bezpieczne dla wrażliwej skóry dziecka.
            </p>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              W naszej ofercie znajdują się starannie wybrane ubranka wykonane z naturalnych tkanin,
              które nie są barwione chemicznie. Stawiamy na materiały przyjazne dla skóry, oddychające
              i komfortowe, aby zapewnić maluszkom wygodę już od pierwszych dni życia.
            </p>
          </div>
        </div>

        {/* ── Wiersz 2: Kolaboracja z Olą Tomalą ── */}
        <div className="mt-20 grid gap-12 lg:grid-cols-2 lg:gap-20 items-center">
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
          <div className="relative aspect-[4/5] overflow-hidden">
            <Image
              src="/images/ola-tomala.jpg"
              alt="Ola Tomala — influencerka i przyszła mama, współtwórczyni kolekcji La de Bébé mini"
              fill
              className="object-cover object-top"
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

        {/* ── Wiersz 3: Trzy filary ── */}
        <div className="mt-20 grid gap-8 md:grid-cols-3">
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
    </section>
  );
}
