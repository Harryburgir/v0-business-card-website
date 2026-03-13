"use client";

import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from "react";

const CART_STORAGE_KEY = "ladebebe-cart";

export interface CartItem {
  id: string;
  title: string;
  price: string;
  priceValue: number;
  image: string;
  size?: string;
  quantity: number;
  categorySlug?: string;
}

interface CartContextValue {
  items: CartItem[];
  isOpen: boolean;
  totalCount: number;
  totalPrice: number;
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (id: string, size?: string) => void;
  updateQuantity: (id: string, size: string | undefined, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

function parsePrice(price: string): number {
  return parseFloat(price.replace(/[^\d.]/g, "").replace(",", ".")) || 0;
}

function itemKey(id: string, size?: string) {
  return size ? `${id}__${size}` : id;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      if (savedCart) {
        const parsed = JSON.parse(savedCart);
        if (Array.isArray(parsed)) {
          setItems(parsed);
        }
      }
    } catch {
      // Ignore localStorage errors
    }
    setIsHydrated(true);
  }, []);

  // Save cart to localStorage whenever items change
  useEffect(() => {
    if (isHydrated) {
      try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
      } catch {
        // Ignore localStorage errors (e.g., quota exceeded)
      }
    }
  }, [items, isHydrated]);

  const addItem = useCallback((incoming: Omit<CartItem, "quantity">) => {
    setItems((prev) => {
      const key = itemKey(incoming.id, incoming.size);
      const exists = prev.find((i) => itemKey(i.id, i.size) === key);
      if (exists) {
        return prev.map((i) =>
          itemKey(i.id, i.size) === key ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [
        ...prev,
        {
          ...incoming,
          priceValue: parsePrice(incoming.price),
          quantity: 1,
        },
      ];
    });
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((id: string, size?: string) => {
    const key = itemKey(id, size);
    setItems((prev) => prev.filter((i) => itemKey(i.id, i.size) !== key));
  }, []);

  const updateQuantity = useCallback(
    (id: string, size: string | undefined, quantity: number) => {
      const key = itemKey(id, size);
      if (quantity <= 0) {
        setItems((prev) => prev.filter((i) => itemKey(i.id, i.size) !== key));
      } else {
        setItems((prev) =>
          prev.map((i) =>
            itemKey(i.id, i.size) === key ? { ...i, quantity } : i
          )
        );
      }
    },
    []
  );

  const clearCart = useCallback(() => setItems([]), []);
  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const totalCount = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce((sum, i) => sum + i.priceValue * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        totalCount,
        totalPrice,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        openCart,
        closeCart,
      }}
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
