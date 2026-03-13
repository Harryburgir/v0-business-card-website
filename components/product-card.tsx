"use client";

import { useState } from "react";
import Image from "next/image";
import { ShoppingBag, Check } from "lucide-react";
import { useCart } from "@/context/cart-context";
import type { Product } from "@/lib/products-data";

interface ProductCardProps {
  product: Product;
  categorySlug: string;
}

export function ProductCard({ product, categorySlug }: ProductCardProps) {
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    product.sizes?.[0]
  );
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    if (product.sizes && !selectedSize) return;
    addItem({
      id: product.id,
      title: product.title,
      price: product.price,
      priceValue: parseFloat(product.price.replace(/[^\d.]/g, "")) || 0,
      image: product.image,
      size: selectedSize,
      categorySlug,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="group">
      <div className="relative aspect-[3/4] overflow-hidden bg-warm/50">
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
            onClick={handleAdd}
            className="flex w-full items-center justify-center gap-2 bg-primary px-4 py-3 text-xs uppercase tracking-widest text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {added ? (
              <>
                <Check className="h-3.5 w-3.5" />
                Dodano
              </>
            ) : (
              <>
                <ShoppingBag className="h-3.5 w-3.5" />
                Dodaj do koszyka
              </>
            )}
          </button>
        </div>
      </div>

      <div className="mt-4">
        <h3 className="font-serif text-lg text-foreground">{product.title}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{product.description}</p>

        {/* Size picker */}
        {product.sizes && product.sizes.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`flex h-7 min-w-[2rem] items-center justify-center border px-2 text-xs transition-colors ${
                  selectedSize === size
                    ? "border-foreground bg-foreground text-background"
                    : "border-border text-muted-foreground hover:border-foreground/50 hover:text-foreground"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        )}

        <p className="mt-3 font-serif text-xl text-foreground">{product.price}</p>
      </div>
    </div>
  );
}
