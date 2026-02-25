"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useTypewriter } from "./use-typewriter";

interface HeroIconDropdownProps {
  heading: string;
  tagline: string;
  description: string;
  stat: string;
  statLabel: string;
  highlights: string[];
  align: "left" | "right";
  children: React.ReactNode;
  onOpenChange?: (open: boolean) => void;
}

export function HeroIconDropdown({
  heading,
  tagline,
  description,
  stat,
  statLabel,
  highlights,
  align,
  children,
  onOpenChange,
}: HeroIconDropdownProps) {
  const [open, setOpen] = useState(false);
  const closeTimeout = useRef<ReturnType<typeof setTimeout>>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const typed = useTypewriter(description, open);
  const showCursor = open && typed.length < description.length;

  // Desktop hover
  const handleEnter = useCallback(() => {
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
    setOpen(true);
  }, []);

  const handleLeave = useCallback(() => {
    closeTimeout.current = setTimeout(() => setOpen(false), 200);
  }, []);

  // Mobile tap
  const handleClick = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  // Notify parent of open state changes
  useEffect(() => {
    onOpenChange?.(open);
  }, [open, onOpenChange]);

  // Close on significant scroll (not micro-scrolls from trackpad)
  useEffect(() => {
    if (!open) return;
    const startY = window.scrollY;
    const onScroll = () => {
      if (Math.abs(window.scrollY - startY) > 50) setOpen(false);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{ pointerEvents: "auto" }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onClick={handleClick}
    >
      {/* Icon (passed as children) */}
      <div className="cursor-pointer">{children}</div>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            className={`absolute z-50 w-72 rounded-2xl border p-5 ${
              align === "left" ? "right-0" : "left-0"
            }`}
            style={{
              top: "calc(100% + 12px)",
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.08) 100%)",
              backdropFilter: "blur(40px) saturate(1.8)",
              WebkitBackdropFilter: "blur(40px) saturate(1.8)",
              borderColor: "rgba(255,255,255,0.2)",
              boxShadow:
                "0 12px 48px -8px rgba(0,0,0,0.15), 0 0 0 1px rgba(255,255,255,0.12) inset, 0 0 60px -20px rgba(4,120,87,0.12)",
            }}
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
          >
            {/* Tagline + stat badge */}
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--ism-accent)]">
                {tagline}
              </span>
              <span className="rounded-full bg-[var(--ism-accent)]/10 px-2 py-0.5 text-[10px] font-bold text-[var(--ism-accent)]">
                {stat} <span className="font-normal opacity-70">{statLabel}</span>
              </span>
            </div>

            {/* Heading */}
            <h4 className="mt-2.5 text-sm font-semibold text-[var(--ism-fg)] dark:text-white">
              {heading}
            </h4>

            {/* Typewriter description */}
            <p className="mt-2 text-[12px] leading-relaxed text-[var(--ism-fg-muted)] dark:text-white/60">
              {typed}
              {showCursor && (
                <span className="ml-0.5 inline-block w-[1px] animate-pulse bg-[var(--ism-accent)]">
                  |
                </span>
              )}
              {!showCursor && open && (
                <span className="ml-0.5 inline-block w-[1px] animate-[pulse_1s_ease-in-out_infinite] text-[var(--ism-accent)]">
                  |
                </span>
              )}
            </p>

            {/* Highlight chips */}
            <div className="mt-3 flex flex-wrap gap-1.5">
              {highlights.map((h) => (
                <span
                  key={h}
                  className="rounded-full border border-[var(--ism-accent)]/15 px-2 py-0.5 text-[10px] font-medium text-[var(--ism-accent)]"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(4,120,87,0.08) 0%, rgba(4,120,87,0.03) 100%)",
                  }}
                >
                  {h}
                </span>
              ))}
            </div>

            {/* Animated accent line at bottom */}
            <motion.div
              className="mt-4 h-px rounded-full bg-gradient-to-r from-[var(--ism-accent)]/30 via-[var(--ism-accent)]/15 to-transparent"
              initial={{ scaleX: 0, originX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
