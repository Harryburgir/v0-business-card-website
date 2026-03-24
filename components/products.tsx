"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { categories } from "@/lib/products-data";
import { ProductCard } from "@/components/product-card";

export function Products() {
  // Get 1 product from each of the first 4 categories
  const featuredProducts = categories.slice(0, 4).map((cat) => ({
    product: cat.products[0],
    categorySlug: cat.slug,
    categoryTitle: cat.title,
  }));

  return (
    <section id="produkty" className="bg-warm/40 px-6 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
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
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.map(({ product, categorySlug, categoryTitle }) => (
            <div key={product.id} className="relative">
              {/* Category Badge */}
              <div className="absolute left-3 top-3 z-10">
                <span className="bg-background/90 px-3 py-1 text-xs uppercase tracking-wider text-foreground backdrop-blur-sm">
                  {categoryTitle}
                </span>
              </div>
              <ProductCard product={product} categorySlug={categorySlug} />
            </div>
          ))}
        </div>

        {/* View All Categories CTA */}
        <div className="mt-16 flex flex-col items-center gap-6 text-center">
          <p className="max-w-lg text-muted-foreground">
            Przeglądaj naszą pełną kolekcję w poszczególnych kategoriach.
          </p>
          <Link
            href="#kolekcje"
            className="inline-flex items-center gap-2 border border-foreground/20 px-8 py-4 text-sm uppercase tracking-widest text-foreground transition-all hover:border-foreground hover:bg-foreground hover:text-background"
          >
            Zobacz wszystkie kolekcje
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
