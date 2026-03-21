import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Mail, Clock, Bell } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import {
  getLadebebeCategoryBySlug,
  getAllLadebebeCategorySlugs,
  ladebebeCategories,
} from "@/lib/products-data";

export async function generateStaticParams() {
  const slugs = getAllLadebebeCategorySlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const category = getLadebebeCategoryBySlug(params.slug);
  if (!category) return { title: "Kategoria nie znaleziona" };

  return {
    title: `${category.title} | La de Bébé`,
    description: category.description,
  };
}

export default async function LadebebeCategoryPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const category = getLadebebeCategoryBySlug(params.slug);

  if (!category) {
    notFound();
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background pt-20">
        {/* Hero section */}
        <section className="bg-[#f7f3ef] px-6 py-16 lg:py-24">
          <div className="mx-auto max-w-7xl">
            <Link
              href="/#ladebebe"
              className="mb-8 inline-flex items-center gap-2 text-sm uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Wróć do La de Bébé
            </Link>

            <div className="flex flex-col gap-2">
              <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
                La de Bébé — {category.ageRange}
              </p>
              <h1 className="font-serif text-4xl font-light italic leading-tight text-foreground md:text-5xl lg:text-6xl">
                {category.title}
              </h1>
              <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
                {category.longDescription}
              </p>
            </div>

            {/* Other categories in this brand */}
            <div className="mt-10 flex flex-wrap gap-3">
              {ladebebeCategories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/ladebebe/${cat.slug}`}
                  className={`border px-4 py-2 text-xs uppercase tracking-widest transition-colors ${
                    cat.slug === category.slug
                      ? "border-foreground bg-foreground text-background"
                      : "border-border text-muted-foreground hover:border-foreground/50 hover:text-foreground"
                  }`}
                >
                  {cat.title}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Coming Soon Section */}
        <section className="px-6 py-16 lg:py-24">
          <div className="mx-auto max-w-4xl">
            <div className="flex flex-col items-center text-center">
              {/* Icon */}
              <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-pink-100">
                <Clock className="h-12 w-12 text-pink-600" />
              </div>

              {/* Heading */}
              <h2 className="font-serif text-3xl font-light italic text-foreground md:text-4xl">
                Już Wkrótce
              </h2>
              
              <p className="mt-6 max-w-xl text-lg text-muted-foreground">
                Pracujemy nad kolekcją <span className="font-medium text-foreground">{category.title}</span> dla dzieci w wieku {category.ageRange}. 
                Wkrótce pojawią się tu piękne, wysokiej jakości ubranka.
              </p>

              {/* Features */}
              <div className="mt-12 grid gap-6 sm:grid-cols-3">
                <div className="flex flex-col items-center p-4">
                  <div className="mb-3 h-12 w-12 rounded-full bg-[#f7f3ef] flex items-center justify-center">
                    <span className="text-lg">🧵</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Naturalne tkaniny</p>
                </div>
                <div className="flex flex-col items-center p-4">
                  <div className="mb-3 h-12 w-12 rounded-full bg-[#f7f3ef] flex items-center justify-center">
                    <span className="text-lg">🎨</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Unikalne wzory</p>
                </div>
                <div className="flex flex-col items-center p-4">
                  <div className="mb-3 h-12 w-12 rounded-full bg-[#f7f3ef] flex items-center justify-center">
                    <span className="text-lg">✨</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Polska jakość</p>
                </div>
              </div>

              {/* Newsletter CTA */}
              <div className="mt-12 w-full max-w-md rounded-lg border border-warm bg-[#f7f3ef] p-6">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <Bell className="h-5 w-5 text-pink-600" />
                  <p className="font-medium text-foreground">Powiadom mnie</p>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Zostaw swój kontakt, a poinformujemy Cię gdy kolekcja będzie dostępna.
                </p>
                <Link
                  href="/#kontakt"
                  className="inline-flex w-full items-center justify-center gap-2 bg-foreground px-6 py-3 text-sm uppercase tracking-widest text-background transition-colors hover:bg-foreground/90"
                >
                  <Mail className="h-4 w-4" />
                  Skontaktuj się z nami
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="bg-[#f7f3ef] px-6 py-16 lg:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-serif text-3xl font-light italic text-foreground md:text-4xl">
              Zainteresowany?
            </h2>
            <p className="mt-4 text-muted-foreground">
              Skontaktuj się z nami, aby sprawdzić dostępność produktów lub zamówić wybrane ubranka z kolekcji La de Bébé.
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
                href="/#ladebebe"
                className="inline-flex items-center gap-2 border border-foreground/20 px-8 py-3 text-sm uppercase tracking-widest text-foreground transition-colors hover:bg-foreground/5"
              >
                Inne kategorie La de Bébé
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
