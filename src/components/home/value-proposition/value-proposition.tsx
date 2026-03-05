"use client";

import Link from "next/link";
import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
} from "motion/react";
import { GlassCard } from "@/components/ui/glass-card";
import { ForumFeed } from "@/components/forum";
import { pillars, forumMessages, forumChannels, communityStats } from "./data";
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
    [0, 0.6, 0.6, 0],
  );

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[var(--ism-bg)] px-6 py-24 lg:px-12 lg:py-36 xl:px-16"
    >
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
        {/* Community — floating app mockup */}
        <div className="relative">
          {/* Ambient glows */}
          <div
            className="pointer-events-none absolute -left-40 top-0 h-[500px] w-[500px] rounded-full opacity-30"
            style={{
              background:
                "radial-gradient(circle, var(--ism-accent) 0%, transparent 70%)",
              filter: "blur(120px)",
            }}
          />
          <div
            className="pointer-events-none absolute -right-32 bottom-0 h-[400px] w-[400px] rounded-full opacity-25"
            style={{
              background:
                "radial-gradient(circle, #6366f1 0%, transparent 70%)",
              filter: "blur(100px)",
            }}
          />

          {/* Header row */}
          <div className="relative flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-xl">
              <motion.p
                className="text-sm font-semibold uppercase tracking-[0.25em] text-[var(--ism-accent)]"
                variants={labelReveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, margin: "-60px" }}
              >
                Student Community
              </motion.p>

              <RevealHeading
                text="You're not alone in this."
                className="text-h2 mt-4 text-[var(--ism-fg)]"
              />

              <motion.p
                className="text-body-lg mt-4 text-[var(--ism-fg-muted)]"
                variants={bodyFade}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, margin: "-60px" }}
              >
                833,000+ international students in Australia — and a growing
                community here to share tips, ask questions, and look out for
                each other.
              </motion.p>
            </div>

            {/* Stats pills */}
            <motion.div
              className="flex items-center gap-3"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6, ease, delay: 0.5 }}
            >
              {communityStats.map((s) => (
                <div
                  key={s.label}
                  className="rounded-xl border border-white/[0.08] px-4 py-2.5 text-center"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
                    backdropFilter: "blur(12px)",
                    boxShadow:
                      "0 2px 12px -2px rgba(0,0,0,0.06), 0 0 0 1px rgba(255,255,255,0.04) inset",
                  }}
                >
                  <span className="text-lg font-bold tracking-tight text-[var(--ism-fg)]">
                    {s.value}
                  </span>
                  <span className="block text-[10px] font-medium uppercase tracking-wider text-[var(--ism-fg-muted)]/60">
                    {s.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* App window mockup */}
          <motion.div
            className="relative mt-12"
            initial={{ opacity: 0, y: 50, rotateX: 4 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: false, margin: "-60px" }}
            transition={{ duration: 1, ease }}
            style={{ perspective: 1200 }}
          >
            {/* Floating notification badge — top right */}
            <motion.div
              className="absolute -right-2 -top-4 z-30 rounded-xl border border-white/[0.1] px-3.5 py-2 shadow-lg md:-right-6 md:-top-6"
              style={{
                background:
                  "linear-gradient(135deg, rgba(4,120,87,0.9) 0%, rgba(16,185,129,0.85) 100%)",
                boxShadow: "0 8px 32px -4px rgba(4,120,87,0.4)",
              }}
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5, ease, delay: 0.8 }}
            >
              <span className="text-xs font-semibold text-white">
                +14 new posts today
              </span>
            </motion.div>

            {/* Floating avatar stack — top left */}
            <motion.div
              className="absolute -left-2 -top-3 z-30 flex items-center md:-left-4 md:-top-5"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5, ease, delay: 0.9 }}
            >
              <div className="flex -space-x-2">
                {["bg-blue-500", "bg-emerald-500", "bg-amber-500", "bg-purple-500", "bg-rose-500"].map(
                  (bg, i) => (
                    <div
                      key={bg}
                      className={`flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#0f1f1a] text-[10px] font-bold text-white ${bg}`}
                      style={{ zIndex: 5 - i }}
                    >
                      {forumMessages[i]?.avatar}
                    </div>
                  ),
                )}
              </div>
              <div
                className="ml-2 rounded-full border border-white/[0.1] px-2.5 py-1"
                style={{
                  background: "rgba(15,31,26,0.8)",
                  backdropFilter: "blur(8px)",
                }}
              >
                <span className="text-[11px] font-medium text-emerald-400">
                  247 online
                </span>
              </div>
            </motion.div>

            <ForumFeed
              initialMessages={forumMessages}
              channels={forumChannels}
              onlineCount={247}
              channel="general"
            />
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div
          className="mx-auto my-20 h-px max-w-md bg-gradient-to-r from-transparent via-[var(--ism-accent)]/20 to-transparent lg:my-28"
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 1.2, ease }}
        />

        {/* Value Proposition — "We've Got Your Back" */}
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
