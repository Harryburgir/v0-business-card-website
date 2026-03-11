export function About() {
  return (
    <section id="o-nas" className="bg-secondary/50 px-6 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="mb-4 text-sm uppercase tracking-[0.3em] text-muted-foreground">
              O nas
            </p>
            <h2 className="font-serif text-4xl font-light leading-tight text-foreground md:text-5xl lg:text-6xl">
              <span className="block text-balance">Pasja do detalu</span>
              <span className="block text-balance">i prostoty</span>
            </h2>
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-lg leading-relaxed text-muted-foreground">
              Jesteśmy studiem kreatywnym z wieloletnim doświadczeniem w projektowaniu 
              i realizacji wyjątkowych projektów. Nasz styl czerpi inspirację ze 
              skandynawskiego minimalizmu - wierzymy, że mniej znaczy więcej.
            </p>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              Każdy projekt traktujemy indywidualnie, dbając o najdrobniejsze szczegóły. 
              Naszym celem jest tworzenie rozwiązań, które są nie tylko piękne, 
              ale również funkcjonalne i ponadczasowe.
            </p>
          </div>
        </div>

        <div className="mt-20 grid gap-8 md:grid-cols-3">
          <div className="border-t border-border pt-8">
            <span className="font-serif text-5xl font-light text-primary">01</span>
            <h3 className="mt-4 text-lg font-medium uppercase tracking-wide text-foreground">
              Projektowanie
            </h3>
            <p className="mt-3 text-muted-foreground">
              Tworzymy unikalne projekty graficzne, branding i identyfikację wizualną.
            </p>
          </div>
          <div className="border-t border-border pt-8">
            <span className="font-serif text-5xl font-light text-primary">02</span>
            <h3 className="mt-4 text-lg font-medium uppercase tracking-wide text-foreground">
              Realizacja
            </h3>
            <p className="mt-3 text-muted-foreground">
              Wprowadzamy projekty w życie z najwyższą dbałością o jakość wykonania.
            </p>
          </div>
          <div className="border-t border-border pt-8">
            <span className="font-serif text-5xl font-light text-primary">03</span>
            <h3 className="mt-4 text-lg font-medium uppercase tracking-wide text-foreground">
              Współpraca
            </h3>
            <p className="mt-3 text-muted-foreground">
              Budujemy długotrwałe relacje oparte na zaufaniu i wspólnych celach.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
