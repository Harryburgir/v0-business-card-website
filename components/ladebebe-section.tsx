"use client";

import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { ladebebeCategories } from "@/lib/products-data";
import { useRevealAnimation, useStaggerAnimation } from "@/hooks/use-reveal-animation";

export function LadebebeSection() {
  const { ref: headerRef, isRevealed: headerRevealed } = useRevealAnimation<HTMLDivElement>();
  const { containerRef: gridRef, containerClassName: gridClass } = useStaggerAnimation<HTMLDivElement>();
  const { ref: ctaRef, isRevealed: ctaRevealed } = useRevealAnimation<HTMLDivElement>();

  return (
    <section id="ladebebe" className="bg-[#f7f3ef] px-6 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div 
          ref={headerRef}
          className={`mb-16 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end reveal-section ${headerRevealed ? "revealed" : ""}`}
        >
          <div>
            <p className="mb-4 text-sm uppercase tracking-[0.3em] text-muted-foreground">
              Dla starszych dzieci
            </p>
            <h2 className="font-serif text-4xl font-light leading-tight text-foreground md:text-5xl lg:text-6xl">
              <span className="block text-balance italic">La de Bébé</span>
            </h2>
            <p className="mt-4 max-w-lg text-lg text-muted-foreground">
              Kolekcja dla dzieci w wieku 2–6 lat. Elegancja, naturalność i ponadczasowy styl 
              dopasowany do aktywnego dziecka.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm uppercase tracking-widest text-muted-foreground">
              2 — 6 lat
            </span>
          </div>
        </div>

        {/* Categories Grid */}
        <div 
          ref={gridRef}
          className={`grid gap-6 sm:grid-cols-2 lg:grid-cols-3 ${gridClass}`}
        >
          {ladebebeCategories.map((category) => (
            <div
              key={category.slug}
              className="group relative flex flex-col bg-background p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              <div className="absolute inset-0 border border-warm transition-colors duration-300 group-hover:border-primary/20" />

              <div className="relative mb-4 flex items-center justify-between">
                <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  {category.ageRange}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-pink-100 px-3 py-1 text-xs font-medium text-pink-700 transition-transform duration-300 group-hover:scale-105">
                  <Clock className="h-3 w-3" />
                  Już wkrótce
                </span>
              </div>

              <h3 className="relative font-serif text-xl text-foreground">
                {category.title}
              </h3>
              <p className="relative mt-2 text-sm leading-relaxed text-muted-foreground">
                {category.description}
              </p>

              <div className="relative mt-6 flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground/60">
                Wkrótce dostępne
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div 
          ref={ctaRef}
          className={`mt-16 border-t border-warm pt-12 text-center reveal-section ${ctaRevealed ? "revealed" : ""}`}
        >
          <p className="mx-auto max-w-xl text-muted-foreground">
            Wszystkie ubranka wykonane z naturalnych, certyfikowanych tkanin. 
            Bezpieczne dla skóry dziecka i przyjazne środowisku.
          </p>
          <Link
            href="#kontakt"
            className="group mt-8 inline-flex items-center gap-2 border border-foreground/20 px-8 py-4 text-sm uppercase tracking-widest text-foreground transition-all duration-300 hover:border-foreground hover:bg-foreground hover:text-background btn-press"
          >
            Zapytaj o kolekcję
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
