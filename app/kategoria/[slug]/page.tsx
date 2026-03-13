import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Mail } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ProductCard } from "@/components/product-card";
import { getCategoryBySlug, getAllCategorySlugs } from "@/lib/products-data";

export async function generateStaticParams() {
  const slugs = getAllCategorySlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const category = getCategoryBySlug(params.slug);
  if (!category) return { title: "Kategoria nie znaleziona" };
  
  return {
    title: `${category.title} | La de Bébé mini`,
    description: category.description,
  };
}

export default async function CategoryPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const category = getCategoryBySlug(params.slug);

  if (!category) {
    notFound();
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background pt-20">
        {/* Hero section */}
        <section className="bg-warm/30 px-6 py-16 lg:py-24">
          <div className="mx-auto max-w-7xl">
            <Link
              href="/#kategorie"
              className="mb-8 inline-flex items-center gap-2 text-sm uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Wróć do kategorii
            </Link>
            
            <p className="mb-4 text-sm uppercase tracking-[0.3em] text-muted-foreground">
              Kategoria
            </p>
            <h1 className="font-serif text-4xl font-light leading-tight text-foreground md:text-5xl lg:text-6xl">
              {category.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
              {category.longDescription}
            </p>
          </div>
        </section>

        {/* Products grid */}
        <section className="px-6 py-16 lg:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12">
              <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
                Dostępne produkty ({category.products.length})
              </p>
            </div>

            {category.products.length > 0 ? (
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {category.products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    categorySlug={category.slug}
                  />
                ))}
              </div>
            ) : (
              <div className="py-16 text-center">
                <p className="text-lg text-muted-foreground">
                  Aktualnie brak dostępnych produktów w tej kategorii.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Contact CTA */}
        <section className="bg-warm/30 px-6 py-16 lg:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-serif text-3xl font-light text-foreground md:text-4xl">
              Zainteresowany?
            </h2>
            <p className="mt-4 text-muted-foreground">
              Skontaktuj się z nami, aby sprawdzić dostępność produktów lub zamówić wybrane ubranka.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/#kontakt"
                className="inline-flex items-center gap-2 bg-primary px-8 py-3 text-sm uppercase tracking-widest text-primary-foreground transition-colors hover:bg-primary/90"
              >
                <Mail className="h-4 w-4" />
                Napisz do nas
              </Link>
              <Link
                href="/#kategorie"
                className="inline-flex items-center gap-2 border border-foreground/20 px-8 py-3 text-sm uppercase tracking-widest text-foreground transition-colors hover:bg-foreground/5"
              >
                Zobacz inne kategorie
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
