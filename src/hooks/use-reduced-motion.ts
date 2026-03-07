"use client";

import { useSyncExternalStore } from "react";

function getReducedSnapshot() {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (mq.matches) return true;

  const isMobile = window.innerWidth <= 768;
  if (isMobile) {
    const cores = navigator.hardwareConcurrency ?? 8;
    const memory = (navigator as { deviceMemory?: number }).deviceMemory ?? 8;
    if (cores <= 4 || memory <= 4) return true;
  }

  return false;
}

function getServerSnapshot() {
  return false;
}

function subscribe(callback: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

/**
 * Returns true when animations should be simplified:
 * - User has prefers-reduced-motion enabled
 * - Device has low CPU cores (≤ 4) or low memory (≤ 4 GB)
 * - Small screen (≤ 768px) with low hardware — mobile budget phones
 */
export function useReducedMotion() {
  return useSyncExternalStore(subscribe, getReducedSnapshot, getServerSnapshot);
}
