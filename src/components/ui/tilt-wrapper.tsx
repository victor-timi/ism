"use client";

import { motion } from "motion/react";
import { useTilt3D } from "@/lib/hooks/use-tilt-3d";

/**
 * Thin wrapper that adds 3D mouse-tilt to its children.
 * No visual styling — purely behavioural. Use when you need tilt
 * without the full GlassCard glassmorphism treatment.
 *
 * @example
 *   <TiltWrapper tiltStrength={10} className="h-full">
 *     <div className="rounded-xl bg-slate-900 p-6">...</div>
 *   </TiltWrapper>
 */
export function TiltWrapper({
  children,
  className,
  tiltStrength = 8,
}: {
  children: React.ReactNode;
  className?: string;
  /** Tilt intensity in degrees. 0 disables. Default 8. */
  tiltStrength?: number;
}) {
  const tilt = useTilt3D(tiltStrength);

  return (
    <motion.div
      ref={tilt.ref}
      onMouseMove={tilt.onMouseMove}
      onMouseLeave={tilt.onMouseLeave}
      style={tilt.style}
      className={className}
    >
      {children}
    </motion.div>
  );
}
