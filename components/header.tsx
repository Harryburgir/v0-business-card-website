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
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md animate-fade-in-down" style={{ animationDuration: "0.4s" }}>
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3 lg:px-8">
        <Link href="/" className="flex items-center transition-transform duration-300 hover:scale-[1.02]">
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
          <Link href="#o-nas" className="text-sm uppercase tracking-widest text-muted-foreground transition-all duration-300 hover:text-foreground link-underline">
            O nas
          </Link>
          <Link href="#kategorie" className="text-sm uppercase tracking-widest text-muted-foreground transition-all duration-300 hover:text-foreground link-underline">
            Kategorie
          </Link>
          <Link href="#kolekcje" className="text-sm uppercase tracking-widest text-muted-foreground transition-all duration-300 hover:text-foreground link-underline">
            Kolekcje
          </Link>
          <Link href="#ladebebe" className="text-sm tracking-widest text-muted-foreground transition-all duration-300 hover:text-foreground font-serif italic link-underline">
            La de Bébé
          </Link>
          <Link href="#produkty" className="text-sm uppercase tracking-widest text-muted-foreground transition-all duration-300 hover:text-foreground link-underline">
            Produkty
          </Link>
          <Link href="#kontakt" className="text-sm uppercase tracking-widest text-muted-foreground transition-all duration-300 hover:text-foreground link-underline">
            Kontakt
          </Link>
        </div>

        {/* Right: cart + mobile menu */}
        <div className="flex items-center gap-3">
          <button
            onClick={openCart}
            aria-label={`Koszyk${totalCount > 0 ? ` (${totalCount})` : ""}`}
            className="relative flex items-center justify-center text-foreground transition-all duration-300 hover:text-primary hover:scale-110"
          >
            <ShoppingBag className="h-5 w-5" />
            {totalCount > 0 && (
              <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center bg-primary text-[10px] font-medium text-primary-foreground animate-scale-in">
                {totalCount > 9 ? "9+" : totalCount}
              </span>
            )}
          </button>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-foreground md:hidden transition-transform duration-300 hover:scale-110"
            aria-label={isMenuOpen ? "Zamknij menu" : "Otwórz menu"}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div 
        className={`absolute left-0 right-0 top-full border-t border-border bg-background px-6 overflow-hidden md:hidden transition-all duration-300 ease-out ${
          isMenuOpen ? "max-h-96 py-8 opacity-100" : "max-h-0 py-0 opacity-0"
        }`}
      >
        <div className="flex flex-col gap-6">
            <Link
              href="#o-nas"
              onClick={() => setIsMenuOpen(false)}
              className="text-sm uppercase tracking-widest text-muted-foreground transition-all duration-300 hover:text-foreground hover:translate-x-2"
            >
              O nas
            </Link>
            <Link
              href="#kategorie"
              onClick={() => setIsMenuOpen(false)}
              className="text-sm uppercase tracking-widest text-muted-foreground transition-all duration-300 hover:text-foreground hover:translate-x-2"
            >
              Kategorie
            </Link>
            <Link
              href="#kolekcje"
              onClick={() => setIsMenuOpen(false)}
              className="text-sm uppercase tracking-widest text-muted-foreground transition-all duration-300 hover:text-foreground hover:translate-x-2"
            >
              Kolekcje
            </Link>
            <Link
              href="#ladebebe"
              onClick={() => setIsMenuOpen(false)}
              className="font-serif text-base italic text-muted-foreground transition-all duration-300 hover:text-foreground hover:translate-x-2"
            >
              La de Bébé
            </Link>
            <Link
              href="#produkty"
              onClick={() => setIsMenuOpen(false)}
              className="text-sm uppercase tracking-widest text-muted-foreground transition-all duration-300 hover:text-foreground hover:translate-x-2"
            >
              Produkty
            </Link>
            <Link
              href="#kontakt"
              onClick={() => setIsMenuOpen(false)}
              className="text-sm uppercase tracking-widest text-muted-foreground transition-all duration-300 hover:text-foreground hover:translate-x-2"
            >
              Kontakt
            </Link>
          </div>
        </div>
    </header>
  );
}
