import Image from "next/image";
import Link from "next/link";
import { getCategories } from "@/lib/supabase-queries";

interface Category {
  id: string;
  title: string;
  description: string;
  long_description: string | null;
  slug: string;
}

export async function Collections() {
  const categories = await getCategories();

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
          {categories.map((category: Category) => {
            // Mapowanie slug'ów na obrazy
            const imageMap: { [key: string]: string } = {
              'niemowleta-0-3-miesiace': '/images/collection-newborn.jpg',
              'niemowleta': '/images/collection-baby.jpg',
              'odkrywcy': '/images/collection-toddler.jpg',
              'dziewczynki': '/images/collection-baby.jpg',
            };
            
            const image = imageMap[category.slug] || '/images/collection-baby.jpg';
            
            return (
              <Link
                key={category.id}
                href="#kontakt"
                className="group cursor-pointer"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-muted">
                  <Image
                    src={image}
                    alt={category.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-foreground/0 transition-colors duration-300 group-hover:bg-foreground/10" />
                </div>
                <div className="mt-6 text-center">
                  <h3 className="mt-2 font-serif text-2xl text-foreground">
                    {category.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {category.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
