"use client";

import { ArrowDown } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function Hero() {
  return (
    <section className="relative min-h-screen">
      {/* Hero Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-kids.jpg"
          alt="Przyszła mama otaczająca brzuszek dłońmi w kształcie serca"
          fill
          className="object-cover object-[center_20%]"
          style={{ objectPosition: "center 20%" }}
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-foreground/30" />
      </div>

      {/* Content */}
      <div className="relative flex min-h-screen flex-col items-center justify-center px-6 pt-20">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-6 text-sm uppercase tracking-[0.3em] text-background/80">
            Stworzone z miłości do najmłodszych
          </p>
          {/* Calligraphic logo */}
          <div className="mx-auto mb-6 flex justify-center">
            <div className="relative w-[340px] md:w-[480px] lg:w-[580px]">
              <Image
                src="/images/ladebebe-logo.jpg"
                alt="La de Bébé mini"
                width={580}
                height={260}
                className="h-auto w-full object-contain mix-blend-multiply opacity-90 brightness-[1.15] contrast-[1.05]"
                priority
              />
            </div>
          </div>
          <h1 className="sr-only">La de Bébé mini – Delikatność od pierwszych dni</h1>
          <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-background/90 md:text-xl">
            Naturalne tkaniny bez barwników chemicznych. Bezpieczne i delikatne dla wrażliwej skóry Twojego maluszka.
          </p>
          <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="#kolekcje"
              className="inline-flex items-center gap-2 bg-warm px-8 py-4 text-sm uppercase tracking-widest text-warm-foreground transition-all hover:bg-warm/90"
            >
              Odkryj kolekcje
            </Link>
            <Link
              href="#kontakt"
              className="inline-flex items-center gap-2 border border-background/60 px-8 py-4 text-sm uppercase tracking-widest text-background transition-all hover:border-background"
            >
              Skontaktuj się
            </Link>
          </div>
        </div>

        <Link
          href="#o-nas"
          className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce text-background/70 transition-colors hover:text-background"
          aria-label="Przewiń w dół"
        >
          <ArrowDown className="h-6 w-6" />
        </Link>
      </div>
    </section>
  );
}
