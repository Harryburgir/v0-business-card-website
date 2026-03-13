"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { X, Minus, Plus, ShoppingBag, Trash2, Mail, ArrowRight } from "lucide-react";
import { useCart } from "@/context/cart-context";
import { Spinner } from "@/components/ui/spinner";

type Step = "cart" | "form" | "success";

interface OrderFormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  notes: string;
}

export function CartSidebar() {
  const { items, isOpen, totalCount, totalPrice, removeItem, updateQuantity, clearCart, closeCart } = useCart();
  const [step, setStep] = useState<Step>("cart");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const overlayRef = useRef<HTMLDivElement>(null);
  const [form, setForm] = useState<OrderFormData>({
    name: "",
    email: "",
    phone: "",
    address: "",
    notes: "",
  });

  // Reset step when cart is closed/reopened
  useEffect(() => {
    if (!isOpen) {
      const t = setTimeout(() => setStep("cart"), 300);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, items, totalPrice }),
      });

      if (res.ok) {
        setStep("success");
        clearCart();
        setStatus("idle");
        setForm({ name: "", email: "", phone: "", address: "", notes: "" });
      } else {
        const data = await res.json();
        setErrorMsg(data.error || "Wystąpił błąd. Spróbuj ponownie.");
        setStatus("error");
      }
    } catch {
      setErrorMsg("Wystąpił błąd połączenia. Spróbuj ponownie.");
      setStatus("error");
    }
  };

  const inputClass =
    "w-full border-b border-border bg-transparent py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none";
  const labelClass = "mb-2 block text-xs uppercase tracking-widest text-muted-foreground";

  return (
    <>
      {/* Overlay */}
      <div
        ref={overlayRef}
        onClick={closeCart}
        className={`fixed inset-0 z-50 bg-foreground/30 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      />

      {/* Sidebar panel */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Koszyk"
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-background shadow-2xl transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-6 py-5">
          <div className="flex items-center gap-3">
            <ShoppingBag className="h-5 w-5 text-primary" />
            <h2 className="font-serif text-xl font-light text-foreground">
              {step === "cart" && "Koszyk"}
              {step === "form" && "Dane zamówienia"}
              {step === "success" && "Zamówienie złożone"}
            </h2>
            {step === "cart" && totalCount > 0 && (
              <span className="flex h-5 w-5 items-center justify-center bg-primary text-xs text-primary-foreground">
                {totalCount}
              </span>
            )}
          </div>
          <button
            onClick={closeCart}
            aria-label="Zamknij koszyk"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {/* CART STEP */}
          {step === "cart" && (
            <div className="flex h-full flex-col">
              {items.length === 0 ? (
                <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 py-16 text-center">
                  <ShoppingBag className="h-12 w-12 text-muted-foreground/40" />
                  <p className="font-serif text-lg font-light text-foreground">
                    Twój koszyk jest pusty
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Dodaj produkty z naszego asortymentu, aby złożyć zamówienie.
                  </p>
                  <button
                    onClick={closeCart}
                    className="mt-2 text-xs uppercase tracking-widest text-primary hover:text-primary/80"
                  >
                    Przeglądaj produkty
                  </button>
                </div>
              ) : (
                <div className="flex-1 px-6 py-4">
                  <ul className="divide-y divide-border">
                    {items.map((item) => (
                      <li key={`${item.id}__${item.size ?? ""}`} className="flex gap-4 py-5">
                        <div className="relative h-20 w-16 flex-shrink-0 overflow-hidden bg-warm/50">
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex flex-1 flex-col justify-between">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <p className="text-sm font-medium text-foreground leading-tight">
                                {item.title}
                              </p>
                              {item.size && (
                                <p className="mt-0.5 text-xs text-muted-foreground">
                                  Rozmiar: {item.size}
                                </p>
                              )}
                            </div>
                            <button
                              onClick={() => removeItem(item.id, item.size)}
                              aria-label={`Usuń ${item.title}`}
                              className="flex-shrink-0 text-muted-foreground/50 transition-colors hover:text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                                aria-label="Zmniejsz ilość"
                                className="flex h-6 w-6 items-center justify-center border border-border text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
                              >
                                <Minus className="h-3 w-3" />
                              </button>
                              <span className="w-6 text-center text-sm text-foreground">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                                aria-label="Zwiększ ilość"
                                className="flex h-6 w-6 items-center justify-center border border-border text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
                              >
                                <Plus className="h-3 w-3" />
                              </button>
                            </div>
                            <p className="font-serif text-base text-foreground">
                              {(item.priceValue * item.quantity).toFixed(0)} zł
                            </p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* FORM STEP */}
          {step === "form" && (
            <form id="order-form" onSubmit={handleSubmit} className="px-6 py-6 space-y-6">
              <div>
                <label className={labelClass}>Imię i nazwisko *</label>
                <input
                  type="text"
                  required
                  placeholder="Anna Kowalska"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Email *</label>
                <input
                  type="email"
                  required
                  placeholder="anna@przyklad.pl"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Telefon</label>
                <input
                  type="tel"
                  placeholder="+48 500 000 000"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Adres dostawy *</label>
                <input
                  type="text"
                  required
                  placeholder="ul. Przykładowa 1, 00-000 Wrocław"
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Uwagi do zamówienia</label>
                <textarea
                  rows={3}
                  placeholder="Dodatkowe informacje, życzenia…"
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  className={`${inputClass} resize-none`}
                />
              </div>

              {/* Order summary */}
              <div className="border-t border-border pt-4">
                <p className="mb-3 text-xs uppercase tracking-widest text-muted-foreground">
                  Podsumowanie
                </p>
                <ul className="space-y-1">
                  {items.map((item) => (
                    <li key={`${item.id}__${item.size ?? ""}`} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        {item.title}
                        {item.size && ` (${item.size})`} × {item.quantity}
                      </span>
                      <span className="text-foreground">
                        {(item.priceValue * item.quantity).toFixed(0)} zł
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {status === "error" && (
                <p className="text-sm text-destructive">{errorMsg}</p>
              )}
            </form>
          )}

          {/* SUCCESS STEP */}
          {step === "success" && (
            <div className="flex flex-col items-center justify-center gap-4 px-6 py-20 text-center">
              <div className="flex h-16 w-16 items-center justify-center bg-warm">
                <Mail className="h-7 w-7 text-primary" />
              </div>
              <h3 className="font-serif text-2xl font-light text-foreground">
                Dziękujemy!
              </h3>
              <p className="text-muted-foreground">
                Twoje zamówienie zostało złożone. Skontaktujemy się wkrótce, aby potwierdzić szczegóły.
              </p>
              <button
                onClick={closeCart}
                className="mt-4 text-xs uppercase tracking-widest text-primary hover:text-primary/80"
              >
                Zamknij
              </button>
            </div>
          )}
        </div>

        {/* Footer / CTA */}
        {step === "cart" && items.length > 0 && (
          <div className="border-t border-border px-6 py-5">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm uppercase tracking-widest text-muted-foreground">
                Łącznie
              </span>
              <span className="font-serif text-xl text-foreground">
                {totalPrice.toFixed(0)} zł
              </span>
            </div>
            <button
              onClick={() => setStep("form")}
              className="flex w-full items-center justify-center gap-2 bg-primary py-4 text-sm uppercase tracking-widest text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Złóż zamówienie
              <ArrowRight className="h-4 w-4" />
            </button>
            <p className="mt-3 text-center text-xs text-muted-foreground">
              Finalizacja przez email — skontaktujemy się w celu potwierdzenia
            </p>
          </div>
        )}

        {step === "form" && (
          <div className="border-t border-border px-6 py-5 space-y-3">
            <button
              type="submit"
              form="order-form"
              disabled={status === "loading"}
              className="flex w-full items-center justify-center gap-2 bg-primary py-4 text-sm uppercase tracking-widest text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {status === "loading" ? (
                <>
                  <Spinner className="h-4 w-4" />
                  Wysyłanie...
                </>
              ) : (
                <>
                  <Mail className="h-4 w-4" />
                  Wyślij zamówienie
                </>
              )}
            </button>
            <button
              type="button"
              onClick={() => setStep("cart")}
              className="w-full py-2 text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
            >
              Wróć do koszyka
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
