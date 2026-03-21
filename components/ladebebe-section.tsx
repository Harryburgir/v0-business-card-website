import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ladebebeCategories } from "@/lib/products-data";

const categoryIcons: Record<string, string> = {
  bluzki: "👕",
  spodnie: "👖",
  sukienki: "👗",
  komplety: "🎀",
  swetry: "🧥",
};

export function LadebebeSection() {
  return (
    <section id="ladebebe" className="bg-[#f7f3ef] px-6 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-16 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="mb-4 text-sm uppercase tracking-[0.3em] text-muted-foreground">
              Dla starszych dzieci
            </p>
            <h2 className="font-serif text-4xl font-light leading-tight text-foreground md:text-5xl lg:text-6xl">
              <span className="block text-balance italic">La de Bébé</span>
            </h2>
            <p className="mt-4 max-w-lg text-lg text-muted-foreground">
              Kolekcja dla dzieci w wieku 2–8 lat. Elegancja, naturalność i ponadczasowy styl 
              dopasowany do aktywnego dziecka.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm uppercase tracking-widest text-muted-foreground">
              2 — 8 lat
            </span>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {ladebebeCategories.map((category) => (
            <Link
              key={category.slug}
              href={`/ladebebe/${category.slug}`}
              className="group relative flex flex-col bg-background p-6 transition-all duration-300 hover:shadow-lg"
            >
              <div className="absolute inset-0 border border-warm transition-colors duration-300 group-hover:border-primary/40" />

              <div className="relative mb-4 flex items-center justify-between">
                <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  {category.ageRange}
                </span>
                <span className="text-xs text-muted-foreground">
                  {category.products.length} szt.
                </span>
              </div>

              <h3 className="relative font-serif text-xl text-foreground">
                {category.title}
              </h3>
              <p className="relative mt-2 text-sm leading-relaxed text-muted-foreground">
                {category.description}
              </p>

              <div className="relative mt-6 flex items-center gap-2 text-xs uppercase tracking-widest text-primary opacity-0 transition-all duration-300 group-hover:opacity-100">
                Zobacz kolekcję
                <ArrowRight className="h-3 w-3" />
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 border-t border-warm pt-12 text-center">
          <p className="mx-auto max-w-xl text-muted-foreground">
            Wszystkie ubranka wykonane z naturalnych, certyfikowanych tkanin. 
            Bezpieczne dla skóry dziecka i przyjazne środowisku.
          </p>
          <Link
            href="#kontakt"
            className="mt-8 inline-flex items-center gap-2 border border-foreground/20 px-8 py-4 text-sm uppercase tracking-widest text-foreground transition-all hover:border-foreground hover:bg-foreground hover:text-background"
          >
            Zapytaj o kolekcję
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
