"use client";

import { useEffect, useState } from "react";

/**
 * Returns true when animations should be simplified:
 * - User has prefers-reduced-motion enabled
 * - Device has low CPU cores (≤ 4) or low memory (≤ 4 GB)
 * - Small screen (≤ 768px) with low hardware — mobile budget phones
 */
export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    // Check OS-level preference
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      setReduced(true);
      return;
    }

    // Check hardware capabilities on mobile-sized screens
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
      const cores = navigator.hardwareConcurrency ?? 8;
      const memory = (navigator as { deviceMemory?: number }).deviceMemory ?? 8;
      if (cores <= 4 || memory <= 4) {
        setReduced(true);
        return;
      }
    }

    // Listen for preference changes
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return reduced;
}
