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
          src="/images/hero-baby.jpg"
          alt="Śpiące niemowlę w pajacyku La de Bébé mini"
          fill
          className="object-cover object-top"
          sizes="100vw"
          priority
        />
        {/* Soft warm overlay harmonising with the cream & pink tones of the photo */}
        <div className="absolute inset-0 bg-gradient-to-b from-pink-50/30 via-transparent to-rose-100/50" />
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
          <p className="mx-auto mt-8 max-w-lg text-base leading-relaxed text-rose-800/80 md:text-lg font-light tracking-wide drop-shadow-sm">
            {`Stworzone z mi\u0142o\u015Bci do najm\u0142odszych`}
          </p>

          {/* Collab tag */}
          <div className="mt-6 inline-flex flex-col items-center gap-2">
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-rose-400/60" />
              <p className="text-xs uppercase tracking-[0.3em] text-rose-700/70 drop-shadow-sm">
                Aktualna kolekcja we współpracy z
              </p>
              <span className="h-px w-10 bg-rose-400/60" />
            </div>
            <p className="font-serif text-2xl font-light text-rose-800 drop-shadow-sm md:text-3xl">
              Ola Tomala
            </p>
          </div>
          
          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="#kolekcje"
              className="inline-flex items-center gap-2 bg-white/90 px-8 py-4 text-sm uppercase tracking-widest text-pink-900 transition-all hover:bg-white shadow-md"
            >
              Odkryj kolekcje
            </Link>
            <Link
              href="#kontakt"
              className="inline-flex items-center gap-2 border-2 border-rose-300/80 px-8 py-4 text-sm uppercase tracking-widest text-rose-800 transition-all hover:bg-white/30 hover:border-rose-400"
            >
              Skontaktuj się
            </Link>
          </div>
        </div>

        <Link
          href="#o-nas"
          className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce text-rose-400/80 transition-colors hover:text-rose-500"
          aria-label="Przewiń w dół"
        >
          <ArrowDown className="h-6 w-6" />
        </Link>
      </div>
    </section>
  );
}
