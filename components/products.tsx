"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { useEffect, useState } from "react";

interface Product {
  id: string;
  product_id: string;
  title: string;
  price: string;
  price_value: number;
  image: string;
  description: string;
  sizes: string[];
  category_id: string;
}

interface Category {
  id: string;
  slug: string;
  title: string;
}

export function Products() {
  const [products, setProducts] = useState<Array<{ product: Product; categorySlug: string; categoryTitle: string }>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFeaturedProducts() {
      try {
        const response = await fetch("/api/featured-products");
        if (!response.ok) throw new Error("Failed to fetch products");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("[v0] Error fetching featured products:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchFeaturedProducts();
  }, []);

  if (loading) {
    return (
      <section id="produkty" className="bg-warm/40 px-6 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="text-muted-foreground">Ładowanie produktów...</p>
          </div>
        </div>
      </section>
    );
  }

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
          {products.map(({ product, categorySlug, categoryTitle }) => (
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
            Przeglądaj naszą pełną kolekcję w poszczególnych kategoriach lub dodaj wybrane produkty do koszyka.
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
