"use client";

import Link from "next/link";
import { useRef, useCallback } from "react";
import { Logo } from "@/components/ui/logo";
import { ROUTES } from "@/lib/routes";

export function LogoTilt({ onHover }: { onHover?: () => void }) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotateY = ((x - cx) / cx) * 20;
    const rotateX = ((cy - y) / cy) * 20;
    el.style.transform = `perspective(300px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
  }, []);

  const handleLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "perspective(300px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
  }, []);

  return (
    <Link
      href={ROUTES.home}
      className="relative z-50"
      onMouseEnter={onHover}
    >
      <div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className="flex items-center gap-2.5 transition-transform duration-200 ease-out"
        style={{ transformStyle: "preserve-3d" }}
      >
        <Logo size={28} />
        <span className="text-lg font-bold tracking-tight" style={{ color: "var(--ism-fg)" }}>
          ISM
        </span>
      </div>
    </Link>
  );
}
