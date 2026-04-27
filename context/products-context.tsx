"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { categories as initialCategories, type Category, type Product } from "@/lib/products-data";

export interface ExtendedProduct extends Omit<Product, 'price'> {
  price: number | string;
  stock: number;
  category: string;
}

interface ProductsContextType {
  categories: Category[];
  products: ExtendedProduct[];
  addProduct: (product: ExtendedProduct) => void;
  updateProduct: (id: string, updates: Partial<ExtendedProduct>) => void;
  deleteProduct: (id: string) => void;
  getCategoryProducts: (categorySlug: string) => Product[];
  getCategoryBySlug: (slug: string) => Category | undefined;
  isLoaded: boolean;
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

const STORAGE_KEY = "admin_products_v2";
const OLD_STORAGE_KEY = "admin_products";

// Convert ExtendedProduct back to Product format for display
function toDisplayProduct(p: ExtendedProduct): Product {
  return {
    id: p.id,
    title: p.title,
    price: typeof p.price === 'number' ? `${p.price} zł` : p.price,
    image: p.image,
    description: p.description,
    sizes: p.sizes,
    comingSoon: false,
  };
}

// Convert initial categories to ExtendedProduct list
function getInitialProducts(): ExtendedProduct[] {
  const products: ExtendedProduct[] = [];
  initialCategories.forEach(cat => {
    cat.products.forEach(p => {
      const priceNum = parseInt(p.price.replace(/[^\d]/g, '')) || 0;
      products.push({
        id: p.id,
        title: p.title,
        description: p.description,
        price: priceNum,
        stock: 40,
        category: cat.slug,
        image: p.image,
        sizes: p.sizes,
        comingSoon: p.comingSoon,
      });
    });
  });
  return products;
}

export function ProductsProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<ExtendedProduct[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load products from localStorage on mount (with migration from old key)
  useEffect(() => {
    let saved = localStorage.getItem(STORAGE_KEY);
    
    // Migrate from old storage key if new one doesn't exist
    if (!saved) {
      const oldSaved = localStorage.getItem(OLD_STORAGE_KEY);
      if (oldSaved) {
        saved = oldSaved;
        localStorage.setItem(STORAGE_KEY, oldSaved);
        localStorage.removeItem(OLD_STORAGE_KEY);
      }
    }
    
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setProducts(parsed);
      } catch (e) {
        console.error("Failed to parse saved products:", e);
        setProducts(getInitialProducts());
      }
    } else {
      setProducts(getInitialProducts());
    }
    setIsLoaded(true);
  }, []);

  // Save products to localStorage whenever they change
  useEffect(() => {
    if (isLoaded && products.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    }
  }, [products, isLoaded]);

  const addProduct = useCallback((product: ExtendedProduct) => {
    setProducts(prev => [...prev, product]);
  }, []);

  const updateProduct = useCallback((id: string, updates: Partial<ExtendedProduct>) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
  }, []);

  const deleteProduct = useCallback((id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  }, []);

  const getCategoryProducts = useCallback((categorySlug: string): Product[] => {
    return products
      .filter(p => p.category === categorySlug)
      .map(toDisplayProduct);
  }, [products]);

  const getCategoryBySlug = useCallback((slug: string): Category | undefined => {
    const baseCat = initialCategories.find(c => c.slug === slug);
    if (!baseCat) return undefined;
    
    return {
      ...baseCat,
      products: getCategoryProducts(slug),
    };
  }, [getCategoryProducts]);

  // Build categories with current products
  const categories: Category[] = initialCategories.map(cat => ({
    ...cat,
    products: getCategoryProducts(cat.slug),
  }));

  return (
    <ProductsContext.Provider value={{
      categories,
      products,
      addProduct,
      updateProduct,
      deleteProduct,
      getCategoryProducts,
      getCategoryBySlug,
      isLoaded,
    }}>
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductsContext);
  if (context === undefined) {
    throw new Error("useProducts must be used within a ProductsProvider");
  }
  return context;
}
