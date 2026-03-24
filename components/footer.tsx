import Link from "next/link";
import { Instagram, Linkedin, Facebook } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-warm bg-warm/30 px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Link href="/" className="font-serif text-xl font-medium tracking-wide text-foreground md:text-2xl">
              La de Bébé mini
            </Link>
            <p className="mt-4 max-w-sm text-muted-foreground">
              Delikatne ubranka z naturalnych tkanin dla noworodków i niemowląt. Bez barwników chemicznych.
            </p>
            <p className="mt-3 max-w-sm text-sm text-muted-foreground">
              Kolekcja stworzona we współpracy z{" "}
              <span className="font-medium text-foreground">Olą Tomalą</span>{" "}
              — artystką i ilustratorką akwarelowych printów.
            </p>
            <div className="mt-6 flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center bg-warm transition-colors hover:bg-primary hover:text-primary-foreground"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center bg-warm transition-colors hover:bg-primary hover:text-primary-foreground"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center bg-warm transition-colors hover:bg-primary hover:text-primary-foreground"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium uppercase tracking-widest text-foreground">
              Nawigacja
            </h4>
            <nav className="mt-6 flex flex-col gap-3">
              <Link href="#o-nas" className="text-muted-foreground transition-colors hover:text-foreground">
                O nas
              </Link>
              <Link href="#kategorie" className="text-muted-foreground transition-colors hover:text-foreground">
                Kategorie
              </Link>
              <Link href="#kolekcje" className="text-muted-foreground transition-colors hover:text-foreground">
                Kolekcje
              </Link>
              <Link href="#produkty" className="text-muted-foreground transition-colors hover:text-foreground">
                Produkty
              </Link>
              <Link href="#kontakt" className="text-muted-foreground transition-colors hover:text-foreground">
                Kontakt
              </Link>
            </nav>
          </div>

          <div>
            <h4 className="text-sm font-medium uppercase tracking-widest text-foreground">
              Kontakt
            </h4>
            <div className="mt-6 flex flex-col gap-3 text-muted-foreground">
              <p>Ladebebemini@gmail.com</p>
              <p>+48 518 845 751</p>
              <p>Wrocław</p>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-warm pt-8 text-sm text-muted-foreground md:flex-row">
          <p>&copy; {new Date().getFullYear()} La de Bébé mini. Wszelkie prawa zastrzeżone.</p>
          <div className="flex gap-6">
            <Link href="/polityka-prywatnosci" className="transition-colors hover:text-foreground">
              Polityka prywatności
            </Link>
            <Link href="/regulamin" className="transition-colors hover:text-foreground">
              Regulamin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
