"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import { categories, ladebebeCategories } from "@/lib/products-data";

interface StockContextValue {
  stock: Map<string, number>;
  getStock: (productId: string) => number;
  setStock: (productId: string, quantity: number) => void;
  decreaseStock: (productId: string, quantity: number) => boolean;
  increaseStock: (productId: string, quantity: number) => void;
  initializeStock: (stocks: Record<string, number>) => void;
}

const StockContext = createContext<StockContextValue | null>(null);

// Initialize stock with all products set to 40
function createInitialStock(): Map<string, number> {
  const stockMap = new Map<string, number>();
  
  // Add mini bebe products (0-1 rok)
  categories.forEach(category => {
    category.products.forEach(product => {
      stockMap.set(product.id, 40);
    });
  });
  
  // Add ladebebe products (2-6 lat)
  ladebebeCategories.forEach(category => {
    category.products.forEach(product => {
      stockMap.set(product.id, 40);
    });
  });
  
  return stockMap;
}

export function StockProvider({ children }: { children: ReactNode }) {
  const [stock, setStockMap] = useState<Map<string, number>>(() => createInitialStock());

  const getStock = useCallback((productId: string) => {
    return stock.get(productId) || 0;
  }, [stock]);

  const setStock = useCallback((productId: string, quantity: number) => {
    setStockMap(prev => {
      const newMap = new Map(prev);
      newMap.set(productId, Math.max(0, quantity));
      return newMap;
    });
  }, []);

  const decreaseStock = useCallback((productId: string, quantity: number) => {
    const currentStock = stock.get(productId) || 0;
    if (currentStock >= quantity) {
      setStockMap(prev => {
        const newMap = new Map(prev);
        newMap.set(productId, currentStock - quantity);
        return newMap;
      });
      return true;
    }
    return false;
  }, [stock]);

  const increaseStock = useCallback((productId: string, quantity: number) => {
    const currentStock = stock.get(productId) || 0;
    setStockMap(prev => {
      const newMap = new Map(prev);
      newMap.set(productId, currentStock + quantity);
      return newMap;
    });
  }, [stock]);

  const initializeStock = useCallback((stocks: Record<string, number>) => {
    setStockMap(prev => {
      const newMap = new Map(prev);
      Object.entries(stocks).forEach(([productId, quantity]) => {
        newMap.set(productId, quantity);
      });
      return newMap;
    });
  }, []);

  return (
    <StockContext.Provider
      value={{ stock, getStock, setStock, decreaseStock, increaseStock, initializeStock }}
    >
      {children}
    </StockContext.Provider>
  );
}

export function useStock() {
  const ctx = useContext(StockContext);
  if (!ctx) throw new Error("useStock must be used within StockProvider");
  return ctx;
}
