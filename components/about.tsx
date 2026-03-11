import Image from "next/image";

export function About() {
  return (
    <section id="o-nas" className="bg-secondary/50 px-6 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="relative aspect-[4/5] overflow-hidden">
            <Image
              src="/images/about-kids.jpg"
              alt="Dziecko w naturalnych ubrankach"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col justify-center">
            <p className="mb-4 text-sm uppercase tracking-[0.3em] text-muted-foreground">
              O nas
            </p>
            <h2 className="font-serif text-4xl font-light leading-tight text-foreground md:text-5xl lg:text-6xl">
              <span className="block text-balance">Stworzone z miłością</span>
              <span className="block text-balance">dla najmłodszych</span>
            </h2>
            <p className="mt-8 text-lg leading-relaxed text-muted-foreground">
              Maleńki to polska marka ubranek dziecięcych inspirowana skandynawskim minimalizmem. 
              Wierzymy, że dzieci zasługują na ubrania, które są nie tylko piękne, 
              ale przede wszystkim wygodne i bezpieczne dla ich delikatnej skóry.
            </p>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              Wszystkie nasze produkty wykonujemy z certyfikowanych, organicznych tkanin. 
              Dbamy o każdy detal - od wyboru materiałów, przez projekt, aż po ostatni szew.
            </p>
          </div>
        </div>

        <div className="mt-20 grid gap-8 md:grid-cols-3">
          <div className="border-t border-border pt-8">
            <span className="font-serif text-5xl font-light text-primary">01</span>
            <h3 className="mt-4 text-lg font-medium uppercase tracking-wide text-foreground">
              Organiczne materiały
            </h3>
            <p className="mt-3 text-muted-foreground">
              100% certyfikowana bawełna organiczna GOTS. Bezpieczna dla skóry i przyjazna środowisku.
            </p>
          </div>
          <div className="border-t border-border pt-8">
            <span className="font-serif text-5xl font-light text-primary">02</span>
            <h3 className="mt-4 text-lg font-medium uppercase tracking-wide text-foreground">
              Ponadczasowy design
            </h3>
            <p className="mt-3 text-muted-foreground">
              Minimalistyczne wzory i stonowane kolory, które nigdy nie wychodzą z mody.
            </p>
          </div>
          <div className="border-t border-border pt-8">
            <span className="font-serif text-5xl font-light text-primary">03</span>
            <h3 className="mt-4 text-lg font-medium uppercase tracking-wide text-foreground">
              Lokalna produkcja
            </h3>
            <p className="mt-3 text-muted-foreground">
              Szyjemy w Polsce, wspierając lokalnych rzemieślników i dbając o najwyższą jakość.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
