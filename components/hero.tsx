import { ArrowDown } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center px-6 pt-20">
      <div className="mx-auto max-w-4xl text-center">
        <p className="mb-6 text-sm uppercase tracking-[0.3em] text-muted-foreground">
          Design & Kreacja
        </p>
        <h1 className="font-serif text-5xl font-light leading-tight tracking-tight text-foreground md:text-7xl lg:text-8xl">
          <span className="block text-balance">Minimalizm</span>
          <span className="block text-balance">spotyka elegancję</span>
        </h1>
        <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl">
          Tworzymy wyjątkowe projekty inspirowane skandynawską estetyką. 
          Prostota, funkcjonalność i dbałość o każdy detal.
        </p>
        <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href="#kontakt"
            className="inline-flex items-center gap-2 bg-primary px-8 py-4 text-sm uppercase tracking-widest text-primary-foreground transition-all hover:bg-primary/90"
          >
            Napisz do nas
          </Link>
          <Link
            href="#o-nas"
            className="inline-flex items-center gap-2 border border-foreground/20 px-8 py-4 text-sm uppercase tracking-widest text-foreground transition-all hover:border-foreground/40"
          >
            Poznaj nas
          </Link>
        </div>
      </div>

      <Link
        href="#o-nas"
        className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce text-muted-foreground transition-colors hover:text-foreground"
        aria-label="Przewiń w dół"
      >
        <ArrowDown className="h-6 w-6" />
      </Link>
    </section>
  );
}
