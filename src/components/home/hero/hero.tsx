"use client";

import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
} from "motion/react";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Counter } from "@/components/animations/counter";
import { stats } from "./data";
import { ease } from "./variants";
import { AnimatedHeading } from "./animated-heading";
import { HeroIllustration } from "./hero-illustration";
import { GrowthChart } from "./growth-chart";
import { useTypewriter } from "./use-typewriter";
import { ROUTES } from "@/lib/routes";

const TAGLINE = "For Students. By Students.";
const DESCRIPTION =
  "We aggregate part-time jobs, share housing, student discounts, and events into one place so international students in Australia can stop searching and start living.";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const subtitleInView = useInView(subtitleRef, { once: false, margin: "-60px" });

  const taglineTyped = useTypewriter(TAGLINE, subtitleInView, 30);
  const descTyped = useTypewriter(DESCRIPTION, subtitleInView, 15);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const headingY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const headingOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  return (
    <section
      ref={sectionRef}
      className="ism-grain relative flex min-h-svh flex-col overflow-hidden bg-[var(--ism-bg)]"
    >
      <HeroIllustration />

      {/* Ambient gradient washes */}
      <div className="pointer-events-none absolute inset-0 z-0">
        {/* Top-right emerald glow */}
        <motion.div
          className="absolute right-[-5%] top-[5%] h-[800px] w-[800px] rounded-full lg:h-[1100px] lg:w-[1100px]"
          style={{
            background:
              "radial-gradient(circle, rgba(4,120,87,0.12) 0%, rgba(4,120,87,0.04) 40%, transparent 70%)",
            filter: "blur(80px)",
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
        />
        {/* Left-center softer wash */}
        <motion.div
          className="absolute -left-[10%] top-[30%] h-[600px] w-[600px] rounded-full lg:h-[800px] lg:w-[800px]"
          style={{
            background:
              "radial-gradient(circle, rgba(4,120,87,0.07) 0%, transparent 65%)",
            filter: "blur(80px)",
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
        />
        {/* Right-center indigo glow */}
        <motion.div
          className="absolute right-[5%] top-[35%] h-[600px] w-[600px] rounded-full lg:h-[900px] lg:w-[900px]"
          style={{
            background:
              "radial-gradient(circle, rgba(99,102,241,0.07) 0%, rgba(99,102,241,0.02) 40%, transparent 70%)",
            filter: "blur(90px)",
          }}
          initial={{ opacity: 0, scale: 0.7 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
        />
        {/* Bottom subtle tint */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[40%]"
          style={{
            background:
              "linear-gradient(to top, rgba(4,120,87,0.04) 0%, transparent 100%)",
          }}
        />
      </div>

      {/* Subtle dot grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 z-[0] opacity-[0.03] dark:opacity-[0.05]"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--ism-fg) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative z-10 flex flex-1 flex-col">
        {/* Heading zone */}
        <motion.div
          className="flex flex-1 flex-col justify-end px-6 pb-8 pt-28 lg:px-12 xl:px-16"
          style={{ y: headingY, opacity: headingOpacity }}
        >
          <div>
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
                style={{ fontSize: "min(1em, calc((100vw - 48px) / 5.5))" }}
              />
            </h1>

            {/* Full name */}
            <motion.p
              className="mt-3 text-xs font-semibold uppercase tracking-[0.3em] text-[var(--ism-fg-muted)] sm:text-sm lg:mt-4 lg:text-base"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-60px" }}
              transition={{ duration: 0.6, ease, delay: 1 }}
            >
              International Students Movement
            </motion.p>

            {/* Animated horizontal rule */}
            <motion.div
              className="mt-6 h-px lg:mt-8"
              style={{
                transformOrigin: "left",
                background: "var(--ism-border)",
              }}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 1.2, ease }}
            />

            {/* Subtitle + CTAs */}
            <motion.div
              ref={subtitleRef}
              className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between lg:mt-8"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-60px" }}
              transition={{ duration: 0.7, ease }}
            >
              <div>
                <div className="relative">
                  <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[var(--ism-accent)]" aria-hidden="true" style={{ visibility: "hidden" }}>
                    {TAGLINE}
                  </p>
                  <p className="absolute inset-0 text-sm font-semibold uppercase tracking-[0.25em] text-[var(--ism-accent)]">
                    {taglineTyped}
                    {subtitleInView && taglineTyped.length < TAGLINE.length && (
                      <span className="ml-0.5 inline-block animate-pulse text-[var(--ism-accent)]">|</span>
                    )}
                  </p>
                </div>
                <div className="relative mt-2">
                  <p className="max-w-2xl text-base text-[var(--ism-fg-muted)] lg:text-lg" aria-hidden="true" style={{ visibility: "hidden" }}>
                    {DESCRIPTION}
                  </p>
                  <p className="absolute inset-0 max-w-2xl text-base text-[var(--ism-fg-muted)] lg:text-lg">
                    {descTyped}
                    {subtitleInView && descTyped.length < DESCRIPTION.length && (
                      <span className="ml-0.5 inline-block animate-pulse text-[var(--ism-fg-muted)]">|</span>
                    )}
                    {subtitleInView && descTyped.length === DESCRIPTION.length && (
                      <span className="ml-0.5 inline-block animate-[pulse_1s_ease-in-out_infinite] text-[var(--ism-fg-muted)]">|</span>
                    )}
                  </p>
                </div>
              </div>
              <motion.div
                className="flex shrink-0 items-center gap-3"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.5, ease, delay: 0.3 }}
              >
                <Button variant="ism" size="lg" asChild>
                  <Link href={ROUTES.hub}>Explore the Hub</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href={ROUTES.about}>Learn More</Link>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Data visualization strip */}
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

          {/* Stats grid */}
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
                className={`bg-[var(--ism-bg)] px-5 py-5 transition-colors hover:bg-[var(--ism-accent)]/[0.04] dark:bg-[var(--ism-bg-elevated)] lg:px-8 lg:py-7 ${
                  i === stats.length - 1
                    ? "col-span-2 sm:col-span-1"
                    : ""
                }`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
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
