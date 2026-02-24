"use client";

import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  type Variants,
} from "motion/react";
import { useRef, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Counter } from "@/components/animations/counter";

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease },
  },
};

/* ═══════════════════════════════════════════
   Particle Canvas — clean, subtle, antigravity
   ═══════════════════════════════════════════ */
interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
}

function ParticleCanvas({
  mouseRef,
}: {
  mouseRef: React.RefObject<{ x: number; y: number }>;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let frameId = 0;
    const particles: Particle[] = [];

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const init = () => {
      resize();
      const count = w > 768 ? 60 : 30;
      particles.length = 0;
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size: Math.random() * 2 + 0.5,
          opacity: Math.random() * 0.15 + 0.04,
        });
      }
    };

    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      const mx = mouseRef.current?.x ?? -1000;
      const my = mouseRef.current?.y ?? -1000;

      // Cursor glow
      if (mx > 0 && my > 0) {
        const glow = ctx.createRadialGradient(mx, my, 0, mx, my, 220);
        glow.addColorStop(0, "rgba(4,120,87,0.04)");
        glow.addColorStop(1, "rgba(4,120,87,0)");
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(mx, my, 220, 0, Math.PI * 2);
        ctx.fill();
      }

      for (const p of particles) {
        const dx = p.x - mx;
        const dy = p.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Antigravity
        if (dist < 180 && dist > 0) {
          const force = ((180 - dist) / 180) * 0.8;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        }

        p.vx += (Math.random() - 0.5) * 0.015;
        p.vy += (Math.random() - 0.5) * 0.015;
        p.vx *= 0.97;
        p.vy *= 0.97;
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < -20) p.x = w + 20;
        if (p.x > w + 20) p.x = -20;
        if (p.y < -20) p.y = h + 20;
        if (p.y > h + 20) p.y = -20;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(4,120,87,${p.opacity})`;
        ctx.fill();
      }

      // Connection lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 12000) {
            const alpha = (1 - Math.sqrt(d2) / 110) * 0.06;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(4,120,87,${alpha})`;
            ctx.lineWidth = 0.4;
            ctx.stroke();
          }
        }
      }

      frameId = requestAnimationFrame(tick);
    };

    init();
    frameId = requestAnimationFrame(tick);
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
    };
  }, [mouseRef]);

  return (
    <canvas ref={canvasRef} className="absolute inset-0 z-0 h-full w-full" />
  );
}

/* ═══════════════════════════════════════════
   Heading — character-level stagger reveal
   ═══════════════════════════════════════════ */
function AnimatedHeading({
  text,
  delay = 0,
  className,
}: {
  text: string;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.span
      className={`block ${className ?? ""}`}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: 0.035, delayChildren: delay },
        },
      }}
      aria-label={text}
    >
      {text.split("").map((char, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden align-top"
          style={{ padding: "0.05em 0.04em", margin: "-0.05em -0.04em" }}
        >
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: "120%", opacity: 0 },
              visible: {
                y: "0%",
                opacity: 1,
                transition: { duration: 0.5, ease },
              },
            }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

/* ═══════════════════════════════════════════
   Growth Chart — full width, tall
   ═══════════════════════════════════════════ */
function GrowthChart() {
  const line =
    "M 0 130 C 50 128 80 124 100 122 C 130 119 170 117 200 115 C 240 112 280 110 300 108 C 340 104 380 100 400 98 C 440 102 480 108 500 110 C 540 108 580 106 600 105 C 650 98 700 90 700 85 C 740 75 780 68 800 62 C 840 52 880 44 900 38 C 940 28 970 20 1000 15";
  const area = line + " L 1000 150 L 0 150 Z";

  return (
    <svg
      viewBox="0 0 1000 150"
      className="h-28 w-full lg:h-40"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="chart-fill" x1="0" y1="0" x2="0" y2="1">
          <stop
            offset="0%"
            stopColor="var(--ism-accent)"
            stopOpacity={0.18}
          />
          <stop
            offset="100%"
            stopColor="var(--ism-accent)"
            stopOpacity={0}
          />
        </linearGradient>
      </defs>
      <motion.path
        d={area}
        fill="url(#chart-fill)"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
      />
      <motion.path
        d={line}
        fill="none"
        stroke="var(--ism-accent)"
        strokeWidth={2}
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 1.2, duration: 2, ease: "easeInOut" }}
      />
    </svg>
  );
}

/* ═══════════════════════════════════════════
   Stats data
   ═══════════════════════════════════════════ */
const stats = [
  {
    value: "833,000+",
    target: 833000,
    format: (n: number) => Math.round(n).toLocaleString() + "+",
    label: "International Students",
    sublabel: "studying in Australia",
  },
  {
    value: "A$53.6B",
    target: 53.6,
    format: (n: number) => `A$${n.toFixed(1)}B`,
    label: "Economic Contribution",
    sublabel: "annual impact",
  },
  {
    value: "#3",
    target: 3,
    format: (n: number) => `#${Math.round(n)}`,
    label: "Top Export",
    sublabel: "largest service export",
  },
  {
    value: "50%+",
    target: 50,
    format: (n: number) => `${Math.round(n)}%+`,
    label: "Asia-Pacific",
    sublabel: "students from APAC",
  },
  {
    value: "~32%",
    target: 32,
    format: (n: number) => `~${Math.round(n)}%`,
    label: "University Enrolment",
    sublabel: "international share",
  },
];

/* ═══════════════════════════════════════════
   HERO
   ═══════════════════════════════════════════ */
export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const glowRef = useRef<HTMLDivElement>(null);

  const onMove = useCallback((e: MouseEvent) => {
    const el = sectionRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    mouseRef.current.x = x;
    mouseRef.current.y = y;
    if (glowRef.current) {
      glowRef.current.style.background = `radial-gradient(600px circle at ${x}px ${y}px, rgba(4,120,87,0.045), transparent 50%)`;
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
    const el = sectionRef.current;
    if (!el) return;
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [onMove, onLeave]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const headingY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const headingOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-svh flex-col overflow-hidden bg-[var(--ism-bg)]"
    >
      <ParticleCanvas mouseRef={mouseRef} />

      {/* Cursor glow overlay */}
      <div
        ref={glowRef}
        className="pointer-events-none absolute inset-0 z-[1] transition-opacity duration-500"
        style={{ opacity: 0 }}
      />

      <div className="relative z-10 flex flex-1 flex-col">
        {/* ── Heading zone ── */}
        <motion.div
          className="flex flex-1 flex-col justify-end px-6 pb-8 pt-28 lg:px-12 xl:px-16"
          style={{ y: headingY, opacity: headingOpacity }}
        >
          <motion.div variants={stagger} initial="hidden" animate="visible">
            <h1
              className="font-extrabold"
              style={{
                fontSize: "clamp(3.5rem, 2rem + 8vw, 11rem)",
                lineHeight: 1.05,
                letterSpacing: "-0.04em",
              }}
            >
              <AnimatedHeading
                text="JOIN THE"
                delay={0.3}
                className="text-[var(--ism-fg)]"
              />
              <AnimatedHeading
                text="MOVEMENT"
                delay={0.65}
                className="text-[var(--ism-accent)]"
              />
            </h1>

            {/* Animated horizontal rule */}
            <motion.div
              className="mt-6 h-px lg:mt-8"
              style={{
                transformOrigin: "left",
                background: "var(--ism-border)",
              }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1.1, duration: 1.2, ease }}
            />

            {/* Subtitle + CTAs */}
            <motion.div
              variants={fadeUp}
              className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between lg:mt-8"
            >
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[var(--ism-accent)]">
                  For Students. By Students.
                </p>
                <p className="mt-2 max-w-xl text-base text-[var(--ism-fg-muted)] lg:text-lg">
                  Your one-stop hub for jobs, housing, and discounts —
                  empowering international students across Australia.
                </p>
              </div>
              <motion.div
                variants={fadeUp}
                className="flex shrink-0 items-center gap-3"
              >
                <Button variant="ism" size="lg" asChild>
                  <Link href="/hub">Explore the Hub</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/about">Learn More</Link>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* ── Data visualization strip ── */}
        <div>
          {/* Chart header */}
          <div className="flex items-center justify-between border-t border-[var(--ism-border)] px-6 py-3 lg:px-12 xl:px-16">
            <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-[var(--ism-fg-muted)]">
              International Student Growth · 2015 — 2025
            </span>
            <span className="rounded-full bg-[var(--ism-accent)]/10 px-2.5 py-0.5 text-[10px] font-semibold text-[var(--ism-accent)]">
              +12% YoY
            </span>
          </div>

          {/* Full-width chart */}
          <GrowthChart />

          {/* Stats grid — gap creates borders */}
          <div
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5"
            style={{
              gap: "1px",
              backgroundColor: "var(--ism-border)",
            }}
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.value}
                className={`bg-[var(--ism-bg)] px-5 py-5 transition-colors hover:bg-[var(--ism-accent)]/[0.04] lg:px-8 lg:py-7 ${
                  i === stats.length - 1
                    ? "col-span-2 sm:col-span-1"
                    : ""
                }`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * i, duration: 0.5, ease }}
              >
                <Counter
                  value={stat.value}
                  target={stat.target}
                  format={stat.format}
                  className="text-3xl font-bold tracking-tight text-[var(--ism-fg)] lg:text-4xl xl:text-5xl"
                />
                <p className="mt-1 text-xs font-medium text-[var(--ism-fg-muted)] lg:text-sm">
                  {stat.label}
                </p>
                <p className="mt-0.5 text-[10px] text-[var(--ism-fg-muted)]/60 lg:text-xs">
                  {stat.sublabel}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
