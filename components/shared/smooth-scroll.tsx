"use client";

import type React from "react";

import { useEffect } from "react";
import Lenis from "lenis";

declare global {
  interface Window {
    __lenisInstance: Lenis | undefined;
  }
}

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    window.__lenisInstance = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      window.__lenisInstance = undefined;
    };
  }, []);

  return <>{children}</>;
}
