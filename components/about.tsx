import Image from "next/image";

export function About() {
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
          {/* Przyciemniona nakładka — spójna z hero */}
          <div className="absolute inset-0 bg-rose-950/40" />
          <div className="absolute inset-0 bg-gradient-to-b from-rose-950/30 via-transparent to-rose-950/40" />
        </div>

        {/* Treść na zdjęciu */}
        <div className="relative mx-auto max-w-7xl w-full px-6 py-32 lg:py-40">
          <div className="max-w-2xl">
            <p className="mb-4 text-sm uppercase tracking-[0.3em] text-rose-200/90 drop-shadow-lg">
              O nas
            </p>
            <h2 className="font-serif text-4xl font-light leading-tight text-white drop-shadow-lg md:text-5xl lg:text-6xl">
              <span className="block text-balance">Stworzone z miłości</span>
              <span className="block text-balance">do najmłodszych</span>
            </h2>
            <p className="mt-8 text-lg leading-relaxed text-rose-100/90 drop-shadow-lg">
              La de Bébé mini to marka stworzona z myślą o dzieciach, które dopiero przychodzą na świat
              oraz o maluszkach w pierwszym roku życia. Wierzymy, że pierwsze ubranka powinny być nie tylko piękne,
              ale przede wszystkim delikatne i bezpieczne dla wrażliwej skóry dziecka.
            </p>
            <p className="mt-6 text-lg leading-relaxed text-rose-100/90 drop-shadow-lg">
              W naszej ofercie znajdują się starannie wybrane ubranka wykonane z naturalnych tkanin,
              które nie są barwione chemicznie. Stawiamy na materiały przyjazne dla skóry, oddychające
              i komfortowe, aby zapewnić maluszkom wygodę już od pierwszych dni życia.
            </p>
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
                Piękne, unikalne wzory w delikatnych kolorach pastelowych.
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
