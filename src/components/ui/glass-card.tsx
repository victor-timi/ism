"use client";

import { useCallback, type MouseEvent as ReactMouseEvent } from "react";
import { motion, useMotionValue, useTransform } from "motion/react";
import { useTilt3D } from "@/lib/hooks/use-tilt-3d";

/* ═══════════════════════════════════════════
   GlassCard — ISM brand glassmorphism card
   with 3D tilt, dynamic glare, and hover glow.

   Usage:
     <GlassCard>content</GlassCard>
     <GlassCard gradient="from-sky-500/20 via-cyan-500/10 to-transparent">
     <GlassCard tiltStrength={10} className="p-8">
   ═══════════════════════════════════════════ */

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  /** Tailwind gradient classes for the accent blob (top-right corner) */
  gradient?: string;
  /** Tilt intensity in degrees — 0 disables tilt. Default 14. */
  tiltStrength?: number;
  /** Additional inline styles for the glass surface */
  style?: React.CSSProperties;
  /** Render as a different element via className — the outer wrapper is always a div */
  as?: "div" | "article";
}

export function GlassCard({
  children,
  className = "",
  gradient,
  tiltStrength = 14,
  style,
  as: Tag = "div",
}: GlassCardProps) {
  const tilt = useTilt3D(tiltStrength);
  const glareOpacity = useMotionValue(0);

  const glareBackground = useTransform(
    [tilt.mouseX, tilt.mouseY],
    ([x, y]) =>
      `radial-gradient(circle at ${Number(x) * 100}% ${Number(y) * 100}%, rgba(255,255,255,0.35), transparent 60%)`,
  );

  const handleMove = useCallback(
    (e: ReactMouseEvent<HTMLDivElement>) => {
      tilt.onMouseMove(e);
      glareOpacity.set(0.15);
    },
    [tilt, glareOpacity],
  );

  const handleLeave = useCallback(() => {
    tilt.onMouseLeave();
    glareOpacity.set(0);
  }, [tilt, glareOpacity]);

  return (
    <motion.div
      ref={tilt.ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={tiltStrength > 0 ? tilt.style : undefined}
      className="group relative h-full"
    >
      {/* Glass glare layer */}
      {tiltStrength > 0 && (
        <motion.div
          className="pointer-events-none absolute inset-0 z-20 rounded-2xl"
          style={{ opacity: glareOpacity, background: glareBackground }}
        />
      )}

      <Tag
        className={`relative h-full overflow-hidden rounded-2xl border border-white/[0.08] ${className}`}
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
          backdropFilter: "blur(24px) saturate(1.4)",
          WebkitBackdropFilter: "blur(24px) saturate(1.4)",
          boxShadow:
            "0 4px 24px -1px rgba(0,0,0,0.08), 0 0 0 1px rgba(255,255,255,0.05) inset, 0 1px 0 rgba(255,255,255,0.1) inset",
          ...style,
        }}
      >
        {/* Accent gradient blob */}
        {gradient && (
          <div
            className={`pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gradient-to-br ${gradient} opacity-60 transition-opacity duration-700 group-hover:opacity-100`}
            style={{ filter: "blur(40px)" }}
          />
        )}

        {/* Border glow on hover */}
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            boxShadow:
              "0 0 0 1px rgba(4,120,87,0.2) inset, 0 8px 48px -8px rgba(4,120,87,0.12)",
          }}
        />

        {children}
      </Tag>
    </motion.div>
  );
}
