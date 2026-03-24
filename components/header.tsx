"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3 lg:px-8">
        <Link href="/" className="flex items-center">
          <Image
            src="/images/ladebebe-logo.png"
            alt="La de Bébé mini"
            width={140}
            height={60}
            className="h-12 w-auto object-contain mix-blend-multiply"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 lg:gap-10 md:flex">
          <Link href="#o-nas" className="text-sm uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground">
            O nas
          </Link>
          <Link href="#kategorie" className="text-sm uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground">
            Kategorie
          </Link>
          <Link href="#kolekcje" className="text-sm uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground">
            Kolekcje
          </Link>
          <Link href="#ladebebe" className="text-sm tracking-widest text-muted-foreground transition-colors hover:text-foreground font-serif italic">
            La de Bébé
          </Link>
          <Link href="#produkty" className="text-sm uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground">
            Produkty
          </Link>
          <Link href="#kontakt" className="text-sm uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground">
            Kontakt
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-foreground md:hidden"
            aria-label={isMenuOpen ? "Zamknij menu" : "Otwórz menu"}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="absolute left-0 right-0 top-full border-t border-border bg-background px-6 py-8 md:hidden">
          <div className="flex flex-col gap-6">
            <Link
              href="#o-nas"
              onClick={() => setIsMenuOpen(false)}
              className="text-sm uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
            >
              O nas
            </Link>
            <Link
              href="#kategorie"
              onClick={() => setIsMenuOpen(false)}
              className="text-sm uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
            >
              Kategorie
            </Link>
            <Link
              href="#kolekcje"
              onClick={() => setIsMenuOpen(false)}
              className="text-sm uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
            >
              Kolekcje
            </Link>
            <Link
              href="#ladebebe"
              onClick={() => setIsMenuOpen(false)}
              className="font-serif text-base italic text-muted-foreground transition-colors hover:text-foreground"
            >
              La de Bébé
            </Link>
            <Link
              href="#produkty"
              onClick={() => setIsMenuOpen(false)}
              className="text-sm uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
            >
              Produkty
            </Link>
            <Link
              href="#kontakt"
              onClick={() => setIsMenuOpen(false)}
              className="text-sm uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
            >
              Kontakt
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
