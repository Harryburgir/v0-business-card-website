"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/cart-context";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { totalCount, openCart } = useCart();

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
          <Link href="#produkty" className="text-sm uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground">
            Produkty
          </Link>
          <Link href="#kontakt" className="text-sm uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground">
            Kontakt
          </Link>
        </div>

        {/* Right side: Cart + mobile menu */}
        <div className="flex items-center gap-3">
          {/* Cart button */}
          <button
            onClick={openCart}
            aria-label={`Koszyk${totalCount > 0 ? ` (${totalCount} produktów)` : ""}`}
            className="relative flex items-center justify-center text-foreground transition-colors hover:text-primary"
          >
            <ShoppingBag className="h-5 w-5" />
            {totalCount > 0 && (
              <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center bg-primary text-[10px] font-medium text-primary-foreground">
                {totalCount > 9 ? "9+" : totalCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Button */}
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
