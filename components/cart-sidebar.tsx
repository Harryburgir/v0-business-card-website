"use client";

import { useState } from "react";
import Image from "next/image";
import { X, Minus, Plus, Trash2, ShoppingBag, ChevronLeft } from "lucide-react";
import { useCart } from "@/context/cart-context";

const DELIVERY_OPTIONS = [
  { id: "inpost-paczkomat", name: "InPost Paczkomat", description: "Odbiór w wybranym Paczkomacie 24/7", price: 12.99 },
  { id: "inpost-kurier", name: "InPost Kurier", description: "Dostawa kurierem pod wskazany adres", price: 16.99 },
  { id: "dpd", name: "DPD Kurier", description: "Dostawa kurierem DPD", price: 15.99 },
  { id: "odbior-osobisty", name: "Odbiór osobisty", description: "Bezpłatny odbiór we Wrocławiu", price: 0 },
];

type Step = "cart" | "delivery" | "form" | "success";

interface FormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  notes: string;
}

export function CartSidebar() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, clearCart, totalPrice } = useCart();
  const [step, setStep] = useState<Step>("cart");
  const [selectedDelivery, setSelectedDelivery] = useState(DELIVERY_OPTIONS[0]);
  const [form, setForm] = useState<FormData>({ name: "", email: "", phone: "", address: "", city: "", postalCode: "", notes: "" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [orderNumber, setOrderNumber] = useState("");

  const deliveryPrice = selectedDelivery.price;
  const finalTotal = totalPrice + deliveryPrice;

  function resetSidebar() {
    setStep("cart");
    setSelectedDelivery(DELIVERY_OPTIONS[0]);
    setForm({ name: "", email: "", phone: "", address: "", city: "", postalCode: "", notes: "" });
    setError("");
    setOrderNumber("");
  }

  function handleClose() {
    closeCart();
    setTimeout(resetSidebar, 300);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const orderItems = items.map((i) => ({
        title: i.product.title,
        size: i.selectedSize || "brak rozmiaru",
        quantity: i.quantity,
        price: i.product.price,
      }));

      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          delivery: selectedDelivery.name,
          deliveryPrice,
          items: orderItems,
          totalPrice: finalTotal,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.error || "Nie udało się wysłać zamówienia. Spróbuj ponownie.");
      } else {
        setOrderNumber(data.orderNumber);
        setStep("success");
        clearCart();
      }
    } catch {
      setError("Błąd połączenia. Sprawdź internet i spróbuj ponownie.");
    } finally {
      setSubmitting(false);
    }
  }

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-40 bg-foreground/30 backdrop-blur-sm"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Sidebar */}
      <aside
        className="fixed right-0 top-0 z-50 flex h-full w-full flex-col bg-background shadow-2xl sm:w-[440px]"
        role="dialog"
        aria-modal="true"
        aria-label="Koszyk"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-6 py-5">
          <div className="flex items-center gap-3">
            {step !== "cart" && step !== "success" && (
              <button
                onClick={() => setStep(step === "form" ? "delivery" : "cart")}
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Wróć"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
            )}
            <h2 className="font-serif text-xl text-foreground">
              {step === "cart" && "Koszyk"}
              {step === "delivery" && "Wybierz dostawę"}
              {step === "form" && "Dane zamówienia"}
              {step === "success" && "Zamówienie złożone"}
            </h2>
          </div>
          <button
            onClick={handleClose}
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Zamknij koszyk"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6">

          {/* STEP: CART */}
          {step === "cart" && (
            <>
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
                  <ShoppingBag className="h-12 w-12 text-muted-foreground/40" />
                  <p className="font-serif text-lg text-muted-foreground">Koszyk jest pusty</p>
                  <p className="text-sm text-muted-foreground">Dodaj produkty, aby złożyć zamówienie</p>
                </div>
              ) : (
                <ul className="flex flex-col gap-5">
                  {items.map((item) => (
                    <li key={`${item.product.id}-${item.selectedSize}`} className="flex gap-4 border-b border-border pb-5">
                      {/* Zdjęcie produktu */}
                      <div className="relative h-20 w-20 shrink-0 overflow-hidden bg-warm/50">
                        <Image
                          src={item.product.image}
                          alt={item.product.title}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-serif text-base text-foreground leading-snug">{item.product.title}</p>
                        {item.selectedSize && (
                          <p className="mt-1 text-xs text-muted-foreground uppercase tracking-wider">Rozmiar: {item.selectedSize}</p>
                        )}
                        <p className="mt-1 font-serif text-base text-foreground">{item.product.price}</p>
                      </div>
                      <div className="flex flex-col items-end gap-3">
                        <button
                          onClick={() => removeItem(item.product.id, item.selectedSize)}
                          className="text-muted-foreground hover:text-destructive transition-colors"
                          aria-label="Usuń produkt"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                        <div className="flex items-center border border-border">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.selectedSize, item.quantity - 1)}
                            className="flex h-7 w-7 items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                            aria-label="Zmniejsz ilość"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="flex h-7 w-8 items-center justify-center text-sm text-foreground">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.selectedSize, item.quantity + 1)}
                            className="flex h-7 w-7 items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                            aria-label="Zwiększ ilość"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}

          {/* STEP: DELIVERY */}
          {step === "delivery" && (
            <div className="flex flex-col gap-3">
              {DELIVERY_OPTIONS.map((option) => (
                <button
                  key={option.id}
                  onClick={() => setSelectedDelivery(option)}
                  className={`flex items-start justify-between p-4 border text-left transition-colors ${
                    selectedDelivery.id === option.id
                      ? "border-foreground bg-warm"
                      : "border-border hover:border-muted-foreground"
                  }`}
                >
                  <div>
                    <p className="font-serif text-base text-foreground">{option.name}</p>
                    <p className="mt-0.5 text-sm text-muted-foreground">{option.description}</p>
                  </div>
                  <span className="ml-4 shrink-0 font-serif text-base text-foreground">
                    {option.price === 0 ? "Bezpłatna" : `${option.price.toFixed(2)} zł`}
                  </span>
                </button>
              ))}
            </div>
          )}

          {/* STEP: FORM */}
          {step === "form" && (
            <form id="order-form" onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="mb-1.5 block text-xs uppercase tracking-widest text-muted-foreground" htmlFor="name">Imię i nazwisko *</label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    className="w-full border border-border bg-transparent px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-foreground focus:outline-none"
                    placeholder="Jan Kowalski"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs uppercase tracking-widest text-muted-foreground" htmlFor="email">Email *</label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    className="w-full border border-border bg-transparent px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-foreground focus:outline-none"
                    placeholder="jan@email.com"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs uppercase tracking-widest text-muted-foreground" htmlFor="phone">Telefon *</label>
                  <input
                    id="phone"
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                    className="w-full border border-border bg-transparent px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-foreground focus:outline-none"
                    placeholder="123 456 789"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs uppercase tracking-widest text-muted-foreground" htmlFor="address">Ulica i numer *</label>
                  <input
                    id="address"
                    type="text"
                    required
                    value={form.address}
                    onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))}
                    className="w-full border border-border bg-transparent px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-foreground focus:outline-none"
                    placeholder="ul. Przykładowa 1"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-1.5 block text-xs uppercase tracking-widest text-muted-foreground" htmlFor="postalCode">Kod pocztowy *</label>
                    <input
                      id="postalCode"
                      type="text"
                      required
                      value={form.postalCode}
                      onChange={(e) => setForm((f) => ({ ...f, postalCode: e.target.value }))}
                      className="w-full border border-border bg-transparent px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-foreground focus:outline-none"
                      placeholder="00-000"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs uppercase tracking-widest text-muted-foreground" htmlFor="city">Miasto *</label>
                    <input
                      id="city"
                      type="text"
                      required
                      value={form.city}
                      onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
                      className="w-full border border-border bg-transparent px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-foreground focus:outline-none"
                      placeholder="Wrocław"
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-xs uppercase tracking-widest text-muted-foreground" htmlFor="notes">Uwagi do zamówienia</label>
                  <textarea
                    id="notes"
                    rows={3}
                    value={form.notes}
                    onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
                    className="w-full resize-none border border-border bg-transparent px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-foreground focus:outline-none"
                    placeholder="Dodatkowe informacje, życzenia..."
                  />
                </div>
              </div>

              {/* Summary */}
              <div className="border-t border-border pt-4">
                <p className="mb-3 text-xs uppercase tracking-widest text-muted-foreground">Podsumowanie</p>
                {items.map((item) => (
                  <div key={`${item.product.id}-${item.selectedSize}`} className="flex justify-between py-1.5 text-sm">
                    <span className="text-muted-foreground">{item.product.title} ({item.selectedSize}) × {item.quantity}</span>
                    <span className="text-foreground">{item.product.price}</span>
                  </div>
                ))}
                <div className="flex justify-between py-1.5 text-sm">
                  <span className="text-muted-foreground">Dostawa: {selectedDelivery.name}</span>
                  <span className="text-foreground">{deliveryPrice === 0 ? "Bezpłatna" : `${deliveryPrice.toFixed(2)} zł`}</span>
                </div>
                <div className="mt-2 flex justify-between border-t border-border pt-3">
                  <span className="text-xs uppercase tracking-widest text-muted-foreground">Razem</span>
                  <span className="font-serif text-xl text-foreground">{finalTotal.toFixed(2)} zł</span>
                </div>
              </div>

              {error && (
                <p className="text-sm text-destructive">{error}</p>
              )}
            </form>
          )}

          {/* STEP: SUCCESS */}
          {step === "success" && (
            <div className="flex flex-col items-center justify-center gap-4 py-8 text-center">
              <div className="flex h-16 w-16 items-center justify-center border-2 border-foreground">
                <svg className="h-8 w-8 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="font-serif text-2xl text-foreground">Zamówienie złożone!</h3>
                <p className="mt-2 text-sm text-muted-foreground">Numer zamówienia:</p>
                <p className="mt-1 font-serif text-lg font-medium text-foreground">{orderNumber}</p>
              </div>

              {/* Payment Information */}
              <div className="mt-4 w-full border border-border bg-warm/50 p-5 text-left">
                <h4 className="mb-3 text-xs uppercase tracking-widest text-muted-foreground">Dane do przelewu</h4>
                <div className="space-y-2 text-sm text-foreground">
                  <p className="font-medium">Ex AEQUO Sp��łka Z.O.O</p>
                  <p>Ul. Bezpieczna 6a</p>
                  <p>51-114 Wrocław</p>
                  <div className="mt-3 pt-3 border-t border-border">
                    <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Nr konta</p>
                    <p className="font-mono font-medium text-foreground">23 1090 2590 0000 0001 6612 4499</p>
                  </div>
                </div>
              </div>

              <p className="max-w-xs text-sm text-muted-foreground leading-relaxed">
                Po zaksięgowaniu wpłaty przystępujemy do realizacji zamówienia. Wpisz numer zamówienia <span className="font-medium text-foreground">{orderNumber}</span> w tytule przelewu, a my się z Tobą skontaktujemy.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        {step === "success" && (
          <div className="border-t border-border px-6 py-5">
            <button
              onClick={handleClose}
              className="w-full bg-foreground py-4 text-xs uppercase tracking-widest text-background transition-colors hover:bg-primary"
            >
              Dokonano wpłaty
            </button>
          </div>
        )}
        {step !== "success" && (
          <div className="border-t border-border px-6 py-5">
            {step === "cart" && items.length > 0 && (
              <div>
                <div className="mb-4 flex justify-between">
                  <span className="text-xs uppercase tracking-widest text-muted-foreground">Suma produktów</span>
                  <span className="font-serif text-lg text-foreground">{totalPrice.toFixed(2)} zł</span>
                </div>
                <button
                  onClick={() => setStep("delivery")}
                  className="w-full bg-foreground py-4 text-xs uppercase tracking-widest text-background transition-colors hover:bg-primary"
                >
                  Przejdź do dostawy
                </button>
              </div>
            )}
            {step === "delivery" && (
              <div>
                <div className="mb-4 flex justify-between">
                  <span className="text-xs uppercase tracking-widest text-muted-foreground">Razem z dostawą</span>
                  <span className="font-serif text-lg text-foreground">{finalTotal.toFixed(2)} zł</span>
                </div>
                <button
                  onClick={() => setStep("form")}
                  className="w-full bg-foreground py-4 text-xs uppercase tracking-widest text-background transition-colors hover:bg-primary"
                >
                  Dane do wysyłki
                </button>
              </div>
            )}
            {step === "form" && (
              <button
                type="submit"
                form="order-form"
                disabled={submitting}
                className="w-full bg-foreground py-4 text-xs uppercase tracking-widest text-background transition-colors hover:bg-primary disabled:opacity-50"
              >
                {submitting ? "Wysyłanie..." : "Wyślij zamówienie"}
              </button>
            )}
          </div>
        )}
      </aside>
    </>
  );
}
