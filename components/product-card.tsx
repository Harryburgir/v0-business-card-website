"use client";

import { useState } from "react";
import Image from "next/image";
import { ShoppingBag, Check } from "lucide-react";
import type { Product } from "@/lib/products-data";
import { useCart } from "@/context/cart-context";

interface ProductCardProps {
  product: Product;
  categorySlug: string;
}

export function ProductCard({ product, categorySlug }: ProductCardProps) {
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState<string>(
    product.sizes && product.sizes.length > 0 ? product.sizes[0] : ""
  );
  const [added, setAdded] = useState(false);
  const isBoy = product.id.includes("chlopiec");
  const isGirl = product.id.includes("dziewczynka");
  const comingSoon = product.comingSoon === true;

  function handleAdd() {
    if (comingSoon) return;
    addItem(product, selectedSize, categorySlug);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <div className="group flex flex-col">
      {/* Image */}
      <div className="relative aspect-[3/4] overflow-hidden bg-warm/50">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className={`object-cover transition-transform duration-500 group-hover:scale-105 ${comingSoon ? "opacity-60 grayscale-[30%]" : ""}`}
        />
        <div className="absolute inset-0 bg-foreground/0 transition-colors duration-300 group-hover:bg-foreground/5" />
        {comingSoon && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="bg-background/90 px-4 py-2 text-xs uppercase tracking-[0.2em] text-foreground border border-foreground/20">
              Wkrótce premiera
            </span>
          </div>
        )}
        {!comingSoon && (isBoy || isGirl) && (
          <div className="absolute left-3 top-3">
            <span className={`inline-block px-3 py-1 text-xs uppercase tracking-widest font-medium ${isBoy ? "bg-sky-100 text-sky-700" : "bg-pink-100 text-pink-700"}`}>
              {isBoy ? "dla chlopca" : "dla dziewczynki"}
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="mt-4 flex flex-1 flex-col">
        <h3 className="font-serif text-lg text-foreground leading-snug">{product.title}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{product.description}</p>

        {/* Sizes */}
        {product.sizes && product.sizes.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => !comingSoon && setSelectedSize(size)}
                disabled={comingSoon}
                className={`flex h-7 min-w-[2rem] items-center justify-center border px-2 text-xs transition-colors ${
                  comingSoon
                    ? "border-border text-border cursor-not-allowed"
                    : selectedSize === size
                    ? "border-foreground bg-foreground text-background"
                    : "border-border text-muted-foreground hover:border-muted-foreground"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        )}

        <div className="mt-3 flex items-center justify-between gap-3">
          <p className="font-serif text-xl text-foreground">{product.price}</p>
          <button
            onClick={handleAdd}
            disabled={comingSoon}
            className={`flex items-center gap-2 border px-4 py-2 text-xs uppercase tracking-widest transition-colors ${
              comingSoon
                ? "cursor-not-allowed border-border text-muted-foreground/50 bg-warm/30"
                : added
                ? "border-rose-300 bg-rose-200 text-rose-900"
                : "border-rose-300 bg-rose-100 text-rose-700 hover:bg-rose-200 hover:text-rose-900"
            }`}
          >
            {comingSoon ? (
              <>
                <ShoppingBag className="h-3.5 w-3.5" />
                Wkrótce
              </>
            ) : added ? (
              <>
                <Check className="h-3.5 w-3.5" />
                Dodano
              </>
            ) : (
              <>
                <ShoppingBag className="h-3.5 w-3.5" />
                Do koszyka
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
