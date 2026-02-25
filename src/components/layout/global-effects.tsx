"use client";

import { useRef, useCallback, useEffect } from "react";
import { ParticleCanvas } from "@/components/home/hero/particle-canvas";

export function GlobalEffects() {
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const glowRef = useRef<HTMLDivElement>(null);

  const onMove = useCallback((e: MouseEvent) => {
    mouseRef.current.x = e.clientX;
    mouseRef.current.y = e.clientY;
    if (glowRef.current) {
      glowRef.current.style.background = `radial-gradient(600px circle at ${e.clientX}px ${e.clientY}px, rgba(4,120,87,0.07), transparent 50%)`;
      glowRef.current.style.opacity = "1";
    }
  }, []);

  const onLeave = useCallback(() => {
    mouseRef.current.x = -1000;
    mouseRef.current.y = -1000;
    if (glowRef.current) {
      glowRef.current.style.opacity = "0";
    }
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, [onMove, onLeave]);

  return (
    <>
      {/* Particles — fixed full viewport, above content */}
      <div className="pointer-events-none fixed inset-0 z-[9999]">
        <ParticleCanvas mouseRef={mouseRef} />
      </div>

      {/* Cursor glow — fixed full viewport, above content */}
      <div
        ref={glowRef}
        className="pointer-events-none fixed inset-0 z-[9998] transition-opacity duration-500"
        style={{ opacity: 0 }}
      />
    </>
  );
}
