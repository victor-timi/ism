"use client";

import Link from "next/link";
import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
} from "motion/react";
import { GlassCard } from "@/components/ui/glass-card";
import { pillars } from "./data";
import { ease, labelReveal, bodyFade, cardVariants } from "./variants";
import { RevealHeading } from "./reveal-heading";

export function ValueProposition() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const glowY = useTransform(scrollYProgress, [0, 1], ["-20%", "30%"]);
  const glowOpacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0, 0.5, 0.5, 0],
  );

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[var(--ism-bg)] px-6 py-24 lg:px-12 lg:py-36 xl:px-16"
    >
      {/* Top divider */}
      <motion.div
        className="absolute left-1/2 top-0 h-px w-full max-w-md -translate-x-1/2 bg-gradient-to-r from-transparent via-[var(--ism-accent)]/20 to-transparent"
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: false }}
        transition={{ duration: 1.2, ease }}
      />

      {/* Ambient background glow */}
      <motion.div
        className="pointer-events-none absolute left-1/2 top-0 z-0 h-[900px] w-[900px] -translate-x-1/2 rounded-full"
        style={{
          y: glowY,
          opacity: glowOpacity,
          background:
            "radial-gradient(circle, var(--ism-accent) 0%, transparent 70%)",
          filter: "blur(140px)",
        }}
      />

      <div className="relative z-10">
        {/* Header */}
        <div className="max-w-3xl">
          <motion.p
            className="text-sm font-semibold uppercase tracking-[0.25em] text-[var(--ism-accent)]"
            variants={labelReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-60px" }}
          >
            We&rsquo;ve Got Your Back
          </motion.p>

          <RevealHeading
            text="Settling in shouldn't be the hardest part."
            className="text-h2 mt-4 text-[var(--ism-fg)]"
          />

          <motion.p
            className="text-body-lg mt-5 max-w-2xl text-[var(--ism-fg-muted)]"
            variants={bodyFade}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-60px" }}
          >
            Moving to Australia for uni is already a big leap. We bring together
            the stuff you actually need — jobs, housing, deals, and events — so
            you can focus on studying, not searching.
          </motion.p>
        </div>

        {/* Pillar cards — glassmorphism + 3D tilt */}
        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:mt-20 lg:grid-cols-4 lg:gap-8">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.heading}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, margin: "-40px" }}
            >
              <GlassCard gradient={pillar.gradient} className="cursor-pointer">
                <Link
                  href={pillar.href}
                  className="relative flex h-full flex-col p-7 lg:p-9"
                >
                  {/* Top row: icon + stat */}
                  <div className="relative flex items-start justify-between">
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/[0.1] transition-all duration-500 group-hover:scale-110 group-hover:border-[var(--ism-accent)]/30"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(4,120,87,0.15) 0%, rgba(4,120,87,0.05) 100%)",
                        backdropFilter: "blur(12px)",
                      }}
                    >
                      <pillar.icon className="h-6 w-6 text-[var(--ism-accent)]" />
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-bold tracking-tight text-[var(--ism-fg)]">
                        {pillar.stat}
                      </span>
                      <span className="block text-[10px] font-medium uppercase tracking-wider text-[var(--ism-fg-muted)]/60">
                        {pillar.statLabel}
                      </span>
                    </div>
                  </div>

                  <p className="text-caption relative mt-6 font-medium text-[var(--ism-accent)]">
                    {pillar.tagline}
                  </p>

                  <h3 className="relative mt-2 text-xl font-semibold tracking-tight text-[var(--ism-fg)] lg:text-2xl">
                    {pillar.heading}
                  </h3>

                  <div className="relative mt-5 h-px w-12 bg-[var(--ism-accent)]/20 transition-all duration-700 group-hover:w-full group-hover:bg-[var(--ism-accent)]/40" />

                  <p className="relative mt-5 flex-1 text-sm leading-relaxed text-[var(--ism-fg-muted)]">
                    {pillar.description}
                  </p>

                  {/* Highlights */}
                  <div className="relative mt-5 flex flex-wrap gap-2">
                    {pillar.highlights.map((h) => (
                      <span
                        key={h}
                        className="rounded-full border border-white/[0.08] px-3 py-1 text-xs font-medium text-[var(--ism-accent)] transition-all duration-300 group-hover:border-[var(--ism-accent)]/20"
                        style={{
                          background:
                            "linear-gradient(135deg, rgba(4,120,87,0.1) 0%, rgba(4,120,87,0.04) 100%)",
                          backdropFilter: "blur(8px)",
                        }}
                      >
                        {h}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <span className="relative mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--ism-accent)]">
                    {pillar.cta}
                    <svg
                      className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-2"
                      fill="none"
                      viewBox="0 0 16 16"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        d="M3 8h10m0 0L9 4m4 4L9 12"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </Link>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
