"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import type { Product } from "@/lib/products-data";

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: string;
  categorySlug: string;
}

interface CartContextValue {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (product: Product, selectedSize: string, categorySlug: string) => void;
  removeItem: (productId: string, selectedSize: string) => void;
  updateQuantity: (productId: string, selectedSize: string, quantity: number) => void;
  clearCart: () => void;
  totalCount: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const addItem = useCallback((product: Product, selectedSize: string, categorySlug: string) => {
    setItems((prev) => {
      const existing = prev.find(
        (i) => i.product.id === product.id && i.selectedSize === selectedSize
      );
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id && i.selectedSize === selectedSize
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prev, { product, quantity: 1, selectedSize, categorySlug }];
    });
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((productId: string, selectedSize: string) => {
    setItems((prev) =>
      prev.filter((i) => !(i.product.id === productId && i.selectedSize === selectedSize))
    );
  }, []);

  const updateQuantity = useCallback((productId: string, selectedSize: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) =>
        prev.filter((i) => !(i.product.id === productId && i.selectedSize === selectedSize))
      );
    } else {
      setItems((prev) =>
        prev.map((i) =>
          i.product.id === productId && i.selectedSize === selectedSize
            ? { ...i, quantity }
            : i
        )
      );
    }
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const totalCount = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce((sum, i) => {
    const price = parseFloat(i.product.price.replace(/[^\d.,]/g, "").replace(",", "."));
    return sum + (isNaN(price) ? 0 : price * i.quantity);
  }, 0);

  return (
    <CartContext.Provider
      value={{ items, isOpen, openCart, closeCart, addItem, removeItem, updateQuantity, clearCart, totalCount, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
