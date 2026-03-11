"use client";

import { useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import { Mail, Phone, MapPin } from "lucide-react";

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="kontakt" className="px-6 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          <div>
            <p className="mb-4 text-sm uppercase tracking-[0.3em] text-muted-foreground">
              Kontakt
            </p>
            <h2 className="font-serif text-4xl font-light leading-tight text-foreground md:text-5xl lg:text-6xl">
              <span className="block text-balance">Masz pytania?</span>
              <span className="block text-balance">Napisz do nas</span>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              Chętnie pomożemy w doborze rozmiaru, odpowiemy na pytania o dostępność 
              lub przyjmiemy indywidualne zamówienie.
            </p>

            <div className="mt-12 space-y-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center bg-secondary">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground">Email</p>
                  <p className="mt-1 text-foreground">hello@ladebebemini.pl</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center bg-secondary">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground">Telefon</p>
                  <p className="mt-1 text-foreground">+48 512 345 678</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center bg-secondary">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground">Showroom</p>
                  <p className="mt-1 text-foreground">ul. Mokotowska 15, Warszawa</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-card p-8 lg:p-12">
            <h3 className="mb-8 font-serif text-2xl font-light text-card-foreground">
              Wyślij zapytanie
            </h3>

            {status === "success" ? (
              <div className="py-12 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Mail className="h-8 w-8 text-primary" />
                </div>
                <h4 className="font-serif text-xl text-foreground">Dziękujemy!</h4>
                <p className="mt-2 text-muted-foreground">
                  Twoja wiadomość została wysłana. Odezwiemy się wkrótce.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-6 text-sm uppercase tracking-widest text-primary hover:text-primary/80"
                >
                  Wyślij kolejną wiadomość
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="mb-2 block text-xs uppercase tracking-widest text-muted-foreground">
                      Imię i nazwisko
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full border-b border-border bg-transparent py-3 text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none"
                      placeholder="Jan Kowalski"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="mb-2 block text-xs uppercase tracking-widest text-muted-foreground">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full border-b border-border bg-transparent py-3 text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none"
                      placeholder="jan@przyklad.pl"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="mb-2 block text-xs uppercase tracking-widest text-muted-foreground">
                    Temat
                  </label>
                  <input
                    type="text"
                    id="subject"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full border-b border-border bg-transparent py-3 text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none"
                    placeholder="Zapytanie o produkt"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="mb-2 block text-xs uppercase tracking-widest text-muted-foreground">
                    Wiadomość
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full resize-none border-b border-border bg-transparent py-3 text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none"
                    placeholder="Jakie produkty Cię interesują? W jakim rozmiarze?"
                  />
                </div>

                {status === "error" && (
                  <p className="text-sm text-destructive">
                    Wystąpił błąd. Spróbuj ponownie lub skontaktuj się bezpośrednio mailowo.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="flex w-full items-center justify-center gap-2 bg-primary py-4 text-sm uppercase tracking-widest text-primary-foreground transition-all hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {status === "loading" ? (
                    <>
                      <Spinner className="h-4 w-4" />
                      Wysyłanie...
                    </>
                  ) : (
                    "Wyślij wiadomość"
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
