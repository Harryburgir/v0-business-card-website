import Image from "next/image";

export function CollabSection() {
  return (
    <section id="kolaboracja" className="px-6 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 items-center">
          {/* Text side */}
          <div className="flex flex-col justify-center order-2 lg:order-1">
            <p className="mb-4 text-sm uppercase tracking-[0.3em] text-muted-foreground">
              Kolaboracja
            </p>
            <h2 className="font-serif text-4xl font-light leading-tight text-foreground md:text-5xl lg:text-6xl">
              <span className="block text-balance">Stworzone razem</span>
              <span className="block text-balance font-medium text-primary">z Olą Tomalą</span>
            </h2>
            <p className="mt-8 text-lg leading-relaxed text-muted-foreground">
              Wszystkie ubranka w naszej kolekcji powstały we współpracy z Olą Tomalą —
              artystką i ilustratorką, której unikatowe akwarelowe projekty nadają każdemu
              ubranku wyjątkowy charakter.
            </p>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              Wspólna pasja do piękna, delikatności i naturalności zaowocowała kolekcją,
              w której każdy print jest oryginalnym dziełem sztuki. To nie są zwykłe
              ubranka — to noszona sztuka dla najnowszych.
            </p>

            <div className="mt-10 border-t border-warm pt-8 flex items-center gap-5">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-1">
                  Projekt graficzny
                </p>
                <p className="font-serif text-2xl font-light text-foreground">
                  Ola Tomala
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Artystka &amp; ilustratorka
                </p>
              </div>
            </div>
          </div>

          {/* Image / visual side */}
          <div className="relative order-1 lg:order-2">
            <div className="relative aspect-[4/5] overflow-hidden bg-warm">
              <Image
                src="/images/about-section.jpg"
                alt="Kolaboracja La de Bébé mini i Ola Tomala – ubranka z akwarelowymi printami"
                fill
                className="object-cover"
              />
              {/* Badge overlay */}
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
    </section>
  );
}
