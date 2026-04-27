"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { categories } from "@/lib/products-data";
import { ProductCard } from "@/components/product-card";
import { useRevealAnimation, useStaggerAnimation } from "@/hooks/use-reveal-animation";

export function Products() {
  // Get 1 product from each of the first 4 categories
  const featuredProducts = categories.slice(0, 4).map((cat) => ({
    product: cat.products[0],
    categorySlug: cat.slug,
    categoryTitle: cat.title,
  }));

  const { ref: headerRef, isRevealed: headerRevealed } = useRevealAnimation<HTMLDivElement>();
  const { containerRef: gridRef, containerClassName: gridClass } = useStaggerAnimation<HTMLDivElement>();
  const { ref: ctaRef, isRevealed: ctaRevealed } = useRevealAnimation<HTMLDivElement>();

  return (
    <section id="produkty" className="bg-warm/40 px-6 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div 
          ref={headerRef}
          className={`mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end reveal-section ${headerRevealed ? "revealed" : ""}`}
        >
          <div>
            <p className="mb-4 text-sm uppercase tracking-[0.3em] text-muted-foreground">
              {"Nasze produkty"}
            </p>
            <h2 className="font-serif text-4xl font-light leading-tight text-foreground md:text-5xl lg:text-6xl">
              {"Delikatność w każdym detalu"}
            </h2>
          </div>
          <p className="max-w-md text-muted-foreground">
            {"Każdy produkt wykonany z naturalnych, niebarwionych tkanin, które są bezpieczne dla wrażliwej skóry maluszka."}
          </p>
        </div>

        {/* Products Grid */}
        <div 
          ref={gridRef}
          className={`grid gap-6 sm:grid-cols-2 lg:grid-cols-4 ${gridClass}`}
        >
          {featuredProducts.map(({ product, categorySlug, categoryTitle }) => (
            <div key={product.id} className="relative">
              {/* Category Badge */}
              <div className="absolute left-3 top-3 z-10">
                <span className="bg-background/90 px-3 py-1 text-xs uppercase tracking-wider text-foreground backdrop-blur-sm transition-transform duration-300 hover:scale-105">
                  {categoryTitle}
                </span>
              </div>
              <ProductCard product={product} categorySlug={categorySlug} />
            </div>
          ))}
        </div>

        {/* View All Categories CTA */}
        <div 
          ref={ctaRef}
          className={`mt-16 flex flex-col items-center gap-6 text-center reveal-section ${ctaRevealed ? "revealed" : ""}`}
        >
          <p className="max-w-lg text-muted-foreground">
            Przeglądaj naszą pełną kolekcję w poszczególnych kategoriach.
          </p>
          <Link
            href="#kolekcje"
            className="group inline-flex items-center gap-2 border border-foreground/20 px-8 py-4 text-sm uppercase tracking-widest text-foreground transition-all duration-300 hover:border-foreground hover:bg-foreground hover:text-background btn-press"
          >
            Zobacz wszystkie kolekcje
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
