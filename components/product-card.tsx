import Image from "next/image";
import type { Product } from "@/lib/products-data";

interface ProductCardProps {
  product: Product;
  categorySlug: string;
}

export function ProductCard({ product }: ProductCardProps) {
  const isBoy = product.id.includes("chlopiec");
  const isGirl = product.id.includes("dziewczynka");

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
        {(isBoy || isGirl) && (
          <div className="absolute left-3 top-3">
            <span
              className={`inline-block px-3 py-1 text-xs uppercase tracking-widest font-medium ${
                isBoy
                  ? "bg-sky-100 text-sky-700"
                  : "bg-pink-100 text-pink-700"
              }`}
            >
              {isBoy ? "dla chlopca" : "dla dziewczynki"}
            </span>
          </div>
        )}
      </div>

      <div className="mt-4">
        <h3 className="font-serif text-lg text-foreground">{product.title}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{product.description}</p>

        {product.sizes && product.sizes.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {product.sizes.map((size) => (
              <span
                key={size}
                className="flex h-7 min-w-[2rem] items-center justify-center border border-border px-2 text-xs text-muted-foreground"
              >
                {size}
              </span>
            ))}
          </div>
        )}

        <p className="mt-3 font-serif text-xl text-foreground">{product.price}</p>
      </div>
    </div>
  );
}
