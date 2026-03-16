"use client";

import Image from "next/image";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/context/cart-context";

const products = [
  {
    id: "spodenki-1",
    title: "Spodenki różowe z falbanką",
    price: "59 zł",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/spodnie-BqKjdb93YurCThQ1DuYuS0YiMLCqwW.jpeg",
    description: "Miękka bawełna, ozdobna falbanka",
  },
  {
    id: "spodenki-2",
    title: "Spodenki niebieskie",
    price: "59 zł",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/spodnie%20%282%29-dleEzvDI28GOHKPrAyP8y6a9f5gSsp.jpeg",
    description: "Naturalna bawełna, wygodna gumka",
  },
  {
    id: "spodenki-3",
    title: "Spodenki różowe w kratkę",
    price: "59 zł",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Spodnie%20%283%29-BGPTUy6cOz2wmPFzAgyyaVq8kle7qx.jpeg",
    description: "Bawełna, wzór w kratkę, falbanka",
  },
  {
    id: "spodenki-4",
    title: "Spodenki białe ze stópkami",
    price: "69 zł",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Spodenki-k41wMq21yNVYBmXWLwuyRtQk69Xjiv.jpeg",
    description: "Bawełna organiczna, ażurowy wzór",
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
