import Image from "next/image";
import Link from "next/link";

const collections = [
  {
    title: "Noworodki",
    subtitle: "0-3 miesiące",
    description: "Delikatne body, śpioszki i kocyki dla najmniejszych",
    image: "/images/collection-newborn.jpg",
  },
  {
    title: "Niemowlaki",
    subtitle: "3-12 miesięcy",
    description: "Wygodne komplety do zabawy i snu",
    image: "/images/collection-baby.jpg",
  },
  {
    title: "Maluchy",
    subtitle: "1-3 lata",
    description: "Praktyczne ubranka dla aktywnych odkrywców",
    image: "/images/collection-toddler.jpg",
  },
];

export function Collections() {
  return (
    <section id="kolekcje" className="px-6 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-muted-foreground">
            Kolekcje
          </p>
          <h2 className="font-serif text-4xl font-light leading-tight text-foreground md:text-5xl lg:text-6xl">
            Dla każdego wieku
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {collections.map((collection, index) => (
            <Link
              key={index}
              href="#kontakt"
              className="group cursor-pointer"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-muted">
                <Image
                  src={collection.image}
                  alt={collection.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-foreground/0 transition-colors duration-300 group-hover:bg-foreground/10" />
              </div>
              <div className="mt-6 text-center">
                <p className="text-xs uppercase tracking-widest text-muted-foreground">
                  {collection.subtitle}
                </p>
                <h3 className="mt-2 font-serif text-2xl text-foreground">
                  {collection.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {collection.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
