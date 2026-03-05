"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
} from "motion/react";
import { ease, labelReveal, bodyFade } from "@/components/animations/variants";
import { RevealHeading } from "@/components/home/value-proposition/reveal-heading";
import { sectionCopy } from "./data";
import { ShowcaseDemo } from "./showcase-demo";
import { FeatureHighlights } from "./feature-highlights";

export function EventsShowcase() {
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
      {/* Top divider — accent gradient line */}
      <motion.div
        className="absolute left-1/2 top-0 h-px w-full max-w-md -translate-x-1/2 bg-gradient-to-r from-transparent via-[var(--ism-accent)]/20 to-transparent"
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: false }}
        transition={{ duration: 1.2, ease }}
      />

      {/* Ambient glow */}
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
        {/* Left-aligned header */}
        <div className="max-w-2xl">
          <motion.p
            className="text-sm font-semibold uppercase tracking-[0.25em] text-[var(--ism-accent)]"
            variants={labelReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-60px" }}
          >
            {sectionCopy.label}
          </motion.p>

          <RevealHeading
            text={sectionCopy.heading}
            className="text-h2 mt-4 text-[var(--ism-fg)]"
          />

          <motion.p
            className="text-body-lg mt-5 max-w-xl text-[var(--ism-fg-muted)]"
            variants={bodyFade}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-60px" }}
          >
            {sectionCopy.description}
          </motion.p>
        </div>

        <ShowcaseDemo />
        <FeatureHighlights />
      </div>
    </section>
  );
}
