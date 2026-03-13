import Link from "next/link";
import { categories } from "@/lib/products-data";

export function Categories() {
  return (
    <section id="kategorie" className="bg-background px-6 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-muted-foreground">
            Asortyment
          </p>
          <h2 className="font-serif text-4xl font-light leading-tight text-foreground md:text-5xl lg:text-6xl">
            <span className="block text-balance">Kategorie produktów</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Starannie wybrane ubranka wykonane z naturalnych tkanin, 
            które nie są barwione chemicznie.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4 lg:gap-8">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/kategoria/${category.slug}`}
              className="group relative flex flex-col items-center justify-center bg-warm/30 p-6 text-center transition-all duration-300 hover:bg-warm hover:shadow-lg sm:p-8 lg:p-10"
            >
              <div className="absolute inset-0 border border-warm transition-colors duration-300 group-hover:border-primary/30" />
              <h3 className="relative font-serif text-lg text-foreground sm:text-xl lg:text-2xl">
                {category.title}
              </h3>
              <p className="relative mt-2 text-xs text-muted-foreground sm:text-sm">
                {category.description}
              </p>
              <span className="relative mt-4 text-xs uppercase tracking-widest text-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                Zobacz produkty
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
