"use client";

import Image from "next/image";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/context/cart-context";

const products = [
  {
    id: "home-body-1",
    title: "Body z naturalnej bawełny",
    price: "79 zł",
    image: "/images/product-1.jpg",
    description: "Bez barwników chemicznych",
  },
  {
    id: "home-spiochy-1",
    title: "Śpioszki muślinowe",
    price: "99 zł",
    image: "/images/product-2.jpg",
    description: "Oddychająca tkanina",
  },
  {
    id: "home-kocyk-1",
    title: "Kocyk otulacz",
    price: "149 zł",
    image: "/images/product-3.jpg",
    description: "100% naturalna bawełna",
  },
  {
    id: "home-wyprawka-1",
    title: "Wyprawka dla noworodka",
    price: "299 zł",
    image: "/images/product-4.jpg",
    description: "Kompletny zestaw startowy",
  },
];

export function Products() {
  const { addItem } = useCart();

  return (
    <section id="produkty" className="bg-warm/40 px-6 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
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

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <div key={product.id} className="group">
              <div className="relative aspect-[3/4] overflow-hidden bg-muted">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-foreground/0 transition-colors duration-300 group-hover:bg-foreground/5" />
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

        <div className="mt-16 text-center">
          <p className="text-muted-foreground">
            Zainteresowany naszymi produktami? Dodaj wybrane do koszyka i złóż zamówienie.
          </p>
        </div>
      </div>
    </section>
  );
}
