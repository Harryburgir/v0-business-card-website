"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "@/context/cart-context";
import { categories } from "@/lib/products-data";

export function Products() {
  const { addItem } = useCart();

  // Get 1 product from each of the first 4 categories
  const featuredProducts = categories.slice(0, 4).map((cat) => ({
    ...cat.products[0],
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
              Nasze produkty
            </p>
            <h2 className="font-serif text-4xl font-light leading-tight text-foreground md:text-5xl lg:text-6xl">
              Delikatność w każdym detalu
            </h2>
          </div>
          <p className="max-w-md text-muted-foreground">
            Każdy produkt wykonany z naturalnych, niebarwionych tkanin, które są bezpieczne dla wrażliwej skóry maluszka.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.map((product) => (
            <div key={product.id} className="group">
              <div className="relative aspect-[3/4] overflow-hidden bg-muted">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-foreground/0 transition-colors duration-300 group-hover:bg-foreground/5" />
                
                {/* Category Badge */}
                <div className="absolute left-3 top-3">
                  <span className="bg-background/90 px-3 py-1 text-xs uppercase tracking-wider text-foreground backdrop-blur-sm">
                    {product.categoryTitle}
                  </span>
                </div>
                
                {/* Add to cart overlay */}
                <div className="absolute inset-x-0 bottom-0 translate-y-full transition-transform duration-300 group-hover:translate-y-0">
                  <button
                    onClick={() =>
                      addItem({
                        id: product.id,
                        title: product.title,
                        price: product.price,
                        priceValue: parseFloat(product.price.replace(/[^\d.]/g, "")),
                        image: product.image,
                      })
                    }
                    className="flex w-full items-center justify-center gap-2 bg-primary px-4 py-3 text-xs uppercase tracking-widest text-primary-foreground transition-colors hover:bg-primary/90"
                  >
                    <ShoppingBag className="h-3.5 w-3.5" />
                    Dodaj do koszyka
                  </button>
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-foreground">{product.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{product.description}</p>
                <p className="mt-2 font-serif text-lg text-foreground">{product.price}</p>
              </div>
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
