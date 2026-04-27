"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface UseRevealAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

/**
 * Custom hook for revealing elements when they enter the viewport.
 * Uses Intersection Observer for performance-optimized animations.
 * Respects reduced motion preferences automatically via CSS.
 */
export function useRevealAnimation<T extends HTMLElement = HTMLDivElement>(
  options: UseRevealAnimationOptions = {}
) {
  const { threshold = 0.1, rootMargin = "0px 0px -50px 0px", triggerOnce = true } = options;
  
  const ref = useRef<T>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsRevealed(true);
            if (triggerOnce) {
              observer.unobserve(entry.target);
            }
          } else if (!triggerOnce) {
            setIsRevealed(false);
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold, rootMargin, triggerOnce]);

  return { ref, isRevealed };
}

/**
 * Custom hook for staggered animations on a group of children.
 * Perfect for grids, lists, and card layouts.
 */
export function useStaggerAnimation<T extends HTMLElement = HTMLDivElement>(
  options: UseRevealAnimationOptions = {}
) {
  const { threshold = 0.05, rootMargin = "0px 0px -30px 0px", triggerOnce = true } = options;
  
  const containerRef = useRef<T>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsRevealed(true);
            if (triggerOnce) {
              observer.unobserve(entry.target);
            }
          } else if (!triggerOnce) {
            setIsRevealed(false);
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(container);

    return () => observer.disconnect();
  }, [threshold, rootMargin, triggerOnce]);

  const containerClassName = `stagger-children ${isRevealed ? "revealed" : ""}`;

  return { containerRef, isRevealed, containerClassName };
}

/**
 * Hook for parallax-like scroll effects (subtle).
 * Uses CSS transforms for GPU acceleration.
 */
export function useParallax<T extends HTMLElement = HTMLDivElement>(speed: number = 0.1) {
  const ref = useRef<T>(null);
  
  const handleScroll = useCallback(() => {
    const element = ref.current;
    if (!element) return;
    
    // Check for reduced motion preference
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    
    const rect = element.getBoundingClientRect();
    const scrolled = window.scrollY;
    const rate = (scrolled - rect.top) * speed;
    
    element.style.transform = `translateY(${rate}px)`;
  }, [speed]);

  useEffect(() => {
    // Use passive listener for better scroll performance
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return ref;
}
