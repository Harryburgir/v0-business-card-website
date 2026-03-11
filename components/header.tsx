"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <Link href="/" className="font-serif text-2xl font-medium tracking-wide text-foreground">
          Studio Nordica
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-10 md:flex">
          <Link href="#o-nas" className="text-sm uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground">
            O nas
          </Link>
          <Link href="#uslugi" className="text-sm uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground">
            Usługi
          </Link>
          <Link href="#realizacje" className="text-sm uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground">
            Realizacje
          </Link>
          <Link href="#kontakt" className="text-sm uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground">
            Kontakt
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-foreground md:hidden"
          aria-label={isMenuOpen ? "Zamknij menu" : "Otwórz menu"}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
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
              href="#uslugi"
              onClick={() => setIsMenuOpen(false)}
              className="text-sm uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
            >
              Usługi
            </Link>
            <Link
              href="#realizacje"
              onClick={() => setIsMenuOpen(false)}
              className="text-sm uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
            >
              Realizacje
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
