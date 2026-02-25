"use client";

import { useRef, useCallback, type MouseEvent as ReactMouseEvent } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";

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
  const ref = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);
  const glareOpacity = useMotionValue(0);

  const springConfig = { stiffness: 300, damping: 25 };
  const springRotateX = useSpring(rotateX, springConfig);
  const springRotateY = useSpring(rotateY, springConfig);

  const handleMove = useCallback(
    (e: ReactMouseEvent<HTMLDivElement>) => {
      if (tiltStrength === 0) return;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;

      rotateX.set((y - 0.5) * -tiltStrength);
      rotateY.set((x - 0.5) * tiltStrength);
      glareX.set(x * 100);
      glareY.set(y * 100);
      glareOpacity.set(0.15);
    },
    [tiltStrength, rotateX, rotateY, glareX, glareY, glareOpacity],
  );

  const handleLeave = useCallback(() => {
    rotateX.set(0);
    rotateY.set(0);
    glareOpacity.set(0);
  }, [rotateX, rotateY, glareOpacity]);

  const glareBackground = useTransform(
    [glareX, glareY],
    ([x, y]) =>
      `radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,0.35), transparent 60%)`,
  );

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{
        rotateX: tiltStrength > 0 ? springRotateX : 0,
        rotateY: tiltStrength > 0 ? springRotateY : 0,
        transformPerspective: 800,
        transformStyle: "preserve-3d",
      }}
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
