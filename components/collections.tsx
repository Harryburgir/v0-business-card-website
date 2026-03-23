import Image from "next/image";
import Link from "next/link";

const collections = [
  {
    title: "Noworodki",
    subtitle: "0-3 miesiące",
    description: "Pierwsze wyprawki, body i kaftaniki dla maluszków przychodzących na świat",
    image: "/images/collection-newborn.jpg",
  },
  {
    title: "Niemowlaki",
    subtitle: "3-6 miesięcy",
    description: "Delikatne śpioszki, komplety i kocyki dla rozwijających się maluszków",
    image: "/images/collection-baby.jpg",
  },
  {
    title: "Odkrywcy",
    subtitle: "6-12 miesięcy",
    description: "Wygodne ubranka dla pierwszych kroków i zabaw",
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
            <span className="block text-balance">Dla pierwszego roku życia</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Połączenie naturalności, subtelności i ponadczasowego stylu, który otula najmłodszych 
            delikatnością i troską w ich pierwszych, najważniejszych chwilach.
          </p>
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
