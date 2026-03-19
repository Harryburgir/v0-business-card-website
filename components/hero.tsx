"use client";

import { ArrowDown } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function Hero() {
  return (
    <section className="relative min-h-screen">
      {/* Hero Background Image */}
      <div className="absolute inset-0">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/hero%20aktualne-DzDz9NkMVCuc9BvHRabOeJdX5V6Olk.png"
          alt="Przyszła mama w różowym świetle"
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority
        />
        {/* Subtle overlay for better logo visibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />
      </div>

      {/* Content */}
      <div className="relative flex min-h-screen flex-col items-center justify-center px-6">
        <div className="mx-auto max-w-4xl text-center">
          {/* Centered Logo - main focal point */}
          <div className="mx-auto flex justify-center">
            <div className="relative w-[280px] sm:w-[380px] md:w-[480px] lg:w-[580px]">
              {/* Soft pink-tinted glow for harmony with background */}
              <div className="absolute inset-0 blur-lg bg-pink-200/10 rounded-full scale-100" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/ladebebe-logo.png"
                alt="La de Bébé mini"
                className="relative w-full h-auto object-contain opacity-90 brightness-95 drop-shadow-[0_0_8px_rgba(236,72,153,0.15)]"
              />
            </div>
          </div>
          <h1 className="sr-only">La de Bébé mini – Delikatność od pierwszych dni</h1>
          
          {/* Tagline below logo */}
          <p className="mx-auto mt-8 max-w-lg text-base leading-relaxed text-white/90 md:text-lg font-light tracking-wide">
            Stworzone z miłości do najmłodszych
          </p>
          
          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="#kolekcje"
              className="inline-flex items-center gap-2 bg-white/95 px-8 py-4 text-sm uppercase tracking-widest text-pink-900 transition-all hover:bg-white shadow-lg"
            >
              Odkryj kolekcje
            </Link>
            <Link
              href="#kontakt"
              className="inline-flex items-center gap-2 border-2 border-white/80 px-8 py-4 text-sm uppercase tracking-widest text-white transition-all hover:bg-white/10 hover:border-white"
            >
              Skontaktuj się
            </Link>
          </div>
        </div>

        <Link
          href="#o-nas"
          className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce text-white/80 transition-colors hover:text-white"
          aria-label="Przewiń w dół"
        >
          <ArrowDown className="h-6 w-6" />
        </Link>
      </div>
    </section>
  );
}
