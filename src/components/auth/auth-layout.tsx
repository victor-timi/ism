"use client";

import Link from "next/link";
import { useRef, useEffect } from "react";
import { motion } from "motion/react";
import { Logo } from "@/components/ui/logo";
import { Counter } from "@/components/animations/counter";
import { ease, labelReveal, bodyFade } from "@/components/animations/variants";
import { ROUTES } from "@/lib/routes";
import { type VariantContent, nodes, connections } from "./data";

/* ─── Variant content ─── */
const signInContent: VariantContent = {
  headline: (
    <>
      Welcome back,
      <br />
      <span className="text-[var(--ism-accent)]">pick up where you left off.</span>
    </>
  ),
  description:
    "Your saved jobs, housing alerts, and exclusive deals are waiting for you.",
  stats: [
    {
      value: "833K+",
      target: 833000,
      label: "Active students",
      format: (n: number) => Math.round(n / 1000).toLocaleString() + "K+",
    },
    {
      value: "2.4K",
      target: 2400,
      label: "New this week",
      format: (n: number) => (n / 1000).toFixed(1) + "K",
    },
    {
      value: "98%",
      target: 98,
      label: "Satisfaction",
      format: (n: number) => Math.round(n) + "%",
    },
  ],
};

const signUpContent: VariantContent = {
  headline: (
    <>
      Join 833,000+
      <br />
      <span className="text-[var(--ism-accent)]">international students.</span>
    </>
  ),
  description:
    "One platform for jobs, housing, events, and student discounts across Australia. Free forever.",
  stats: [
    {
      value: "833K+",
      target: 833000,
      label: "Students",
      format: (n: number) => Math.round(n / 1000).toLocaleString() + "K+",
    },
    {
      value: "6",
      target: 6,
      label: "Cities",
      format: (n: number) => Math.round(n).toString(),
    },
    {
      value: "Free",
      target: 100,
      label: "Forever",
      format: () => "Free",
    },
  ],
};

function NetworkDiagram() {
  const containerRef = useRef<HTMLDivElement>(null);
  const nodesLayerRef = useRef<HTMLDivElement>(null);
  const svgLayerRef = useRef<HTMLDivElement>(null);
  const dotsLayerRef = useRef<HTMLDivElement>(null);

  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useEffect(() => {
    let frameId = 0;
    const layers = [
      { ref: svgLayerRef, speed: 0.4, tx: 0, ty: 0, rotate: 0 },
      { ref: nodesLayerRef, speed: 1.2, tx: 0, ty: 0, rotate: 0 },
      { ref: dotsLayerRef, speed: 0.6, tx: 0, ty: 0, rotate: 0 },
    ];

    const tick = () => {
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;

      for (const layer of layers) {
        if (!layer.ref.current) continue;

        if (mx > 0 && my > 0) {
          const targetX = ((mx - cx) / cx) * 20 * layer.speed;
          const targetY = ((my - cy) / cy) * 15 * layer.speed;
          const targetR = ((mx - cx) / cx) * 2 * layer.speed;
          layer.tx += (targetX - layer.tx) * 0.05;
          layer.ty += (targetY - layer.ty) * 0.05;
          layer.rotate += (targetR - layer.rotate) * 0.03;
        } else {
          layer.tx += (0 - layer.tx) * 0.03;
          layer.ty += (0 - layer.ty) * 0.03;
          layer.rotate += (0 - layer.rotate) * 0.03;
        }

        layer.ref.current.style.transform =
          `translate(${layer.tx}px, ${layer.ty}px) rotate(${layer.rotate}deg)`;
      }

      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, []);

  const nodeMap = Object.fromEntries(nodes.map((n) => [n.id, n]));

  return (
    <div ref={containerRef} className="relative h-full w-full">
      {/* SVG connections */}
      <div ref={svgLayerRef} className="absolute inset-0">
        <svg className="h-full w-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id="conn-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(16,185,129,0.25)" />
              <stop offset="100%" stopColor="rgba(26,26,46,0.15)" />
            </linearGradient>
          </defs>
          {connections.map(([from, to], i) => {
            const a = nodeMap[from];
            const b = nodeMap[to];
            if (!a || !b) return null;
            return (
              <motion.line
                key={`${from}-${to}`}
                x1={`${a.x}%`}
                y1={`${a.y}%`}
                x2={`${b.x}%`}
                y2={`${b.y}%`}
                stroke="url(#conn-grad)"
                strokeWidth={1}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.8 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              />
            );
          })}
        </svg>
      </div>

      {/* Nodes */}
      <div ref={nodesLayerRef} className="absolute inset-0">
        {nodes.map((node) => {
          const isMain = "icon" in node && node.icon;
          return (
            <motion.div
              key={node.id}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 + node.delay, ease }}
            >
              {isMain ? (
                <motion.div
                  className="flex flex-col items-center gap-1.5"
                  animate={{ y: [0, -6, 0] }}
                  transition={{
                    duration: 4 + node.delay,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/[0.1]"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(16,185,129,0.2) 0%, rgba(26,26,46,0.3) 100%)",
                      backdropFilter: "blur(8px)",
                      boxShadow: "0 0 20px rgba(16,185,129,0.15)",
                    }}
                  >
                    {node.icon && <node.icon className="h-5 w-5 text-[var(--ism-accent)]" />}
                  </div>
                  <span className="text-[10px] font-semibold tracking-wider text-white/50 uppercase">
                    {node.label}
                  </span>
                </motion.div>
              ) : (
                <motion.div
                  className="h-2 w-2 rounded-full"
                  style={{
                    background: "rgba(16,185,129,0.4)",
                    boxShadow: "0 0 8px rgba(16,185,129,0.3)",
                  }}
                  animate={{
                    scale: [1, 1.4, 1],
                    opacity: [0.4, 0.8, 0.4],
                  }}
                  transition={{
                    duration: 3 + node.delay * 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Ambient floating dots */}
      <div ref={dotsLayerRef} className="absolute inset-0">
        <svg className="h-full w-full" preserveAspectRatio="none">
          <motion.circle cx="15%" cy="45%" r="2" fill="rgba(16,185,129,0.3)"
            animate={{ opacity: [0.15, 0.4, 0.15], scale: [1, 1.3, 1] }}
            transition={{ duration: 3, repeat: Infinity }} />
          <motion.circle cx="88%" cy="38%" r="1.5" fill="rgba(16,185,129,0.25)"
            animate={{ opacity: [0.1, 0.35, 0.1] }}
            transition={{ duration: 4, repeat: Infinity, delay: 1 }} />
          <motion.circle cx="45%" cy="12%" r="2" fill="rgba(16,185,129,0.2)"
            animate={{ opacity: [0.08, 0.3, 0.08], scale: [1, 1.2, 1] }}
            transition={{ duration: 3.5, repeat: Infinity, delay: 0.5 }} />
          <motion.circle cx="70%" cy="85%" r="1.5" fill="rgba(16,185,129,0.2)"
            animate={{ opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 4, repeat: Infinity, delay: 1.5 }} />
        </svg>
      </div>

      {/* Animated pulse ring on center node */}
      <motion.div
        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--ism-accent)]/20"
        style={{ left: "50%", top: "68%", width: 80, height: 80 }}
        animate={{
          scale: [1, 2.5],
          opacity: [0.3, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeOut",
        }}
      />
    </div>
  );
}

export function AuthLayout({
  variant = "sign-up",
  children,
}: {
  variant?: "sign-in" | "sign-up";
  children: React.ReactNode;
}) {
  const content = variant === "sign-in" ? signInContent : signUpContent;

  return (
    <div className="flex min-h-screen">
      {/* Left Panel — branding */}
      <div className="ism-grain relative hidden w-[42%] overflow-hidden bg-[var(--ism-navy)] lg:flex lg:flex-col lg:p-12 xl:p-16">
        {/* Animated ambient glows */}
        <div className="pointer-events-none absolute inset-0 z-0">
          <motion.div
            className="absolute left-1/2 top-1/4 h-[500px] w-[500px] -translate-x-1/2 rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(16,185,129,0.14) 0%, transparent 60%)",
              filter: "blur(80px)",
            }}
            animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -right-[10%] bottom-[20%] h-[400px] w-[400px] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 60%)",
              filter: "blur(70px)",
            }}
            animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          />
          {/* Extra top-right warm glow */}
          <motion.div
            className="absolute -right-[5%] top-[10%] h-[300px] w-[300px] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(16,185,129,0.08) 0%, transparent 65%)",
              filter: "blur(60px)",
            }}
            animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
        </div>

        {/* Dot grid */}
        <div
          className="pointer-events-none absolute inset-0 z-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        {/* Animated border line on right edge */}
        <motion.div
          className="absolute right-0 top-0 bottom-0 w-px"
          style={{
            background:
              "linear-gradient(to bottom, transparent, rgba(16,185,129,0.3), rgba(26,26,46,0.4), transparent)",
          }}
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Top: Logo + Headline */}
        <div className="relative z-10 shrink-0">
          <Link href={ROUTES.home} className="flex items-center gap-2.5">
            <Logo size={36} />
            <span className="text-xl font-bold tracking-tight text-white">ISM</span>
          </Link>

          <motion.p
            className="mt-8 text-3xl font-bold leading-tight text-white xl:text-4xl"
            variants={labelReveal}
            initial="hidden"
            animate="visible"
          >
            {content.headline}
          </motion.p>
          <motion.p
            className="mt-3 max-w-xs text-sm leading-relaxed text-white/50"
            variants={bodyFade}
            initial="hidden"
            animate="visible"
          >
            {content.description}
          </motion.p>
        </div>

        {/* Middle: Interactive network diagram with parallax */}
        <div className="relative z-10 my-4 flex-1 min-h-0">
          <NetworkDiagram />
        </div>

        {/* Bottom: Stats bar — full width */}
        <motion.div
          className="relative z-10 shrink-0 flex items-center rounded-xl border border-white/[0.08]"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
            backdropFilter: "blur(12px)",
          }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.6 }}
          whileHover={{
            borderColor: "rgba(16,185,129,0.25)",
            transition: { duration: 0.25 },
          }}
        >
          {content.stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`flex-1 px-5 py-4 ${
                i < content.stats.length - 1 ? "border-r border-white/[0.08]" : ""
              }`}
            >
              <Counter
                value={stat.value}
                target={stat.target}
                format={stat.format}
                className="text-xl font-bold text-white"
                duration={2}
              />
              <p className="mt-0.5 text-xs text-white/40">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Right Panel — form */}
      <div className="relative flex flex-1 items-center justify-center bg-[var(--ism-bg)] px-6 py-12 lg:px-12 dark:bg-[var(--ism-bg-elevated)]">
        {/* Subtle left border accent in dark mode */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 hidden w-px dark:block" style={{ background: "linear-gradient(to bottom, transparent, rgba(16,185,129,0.15), transparent)" }} />
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="mb-8 flex items-center gap-2.5 lg:hidden">
            <Logo size={32} />
            <span className="text-lg font-bold tracking-tight text-[var(--ism-fg)]">ISM</span>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
