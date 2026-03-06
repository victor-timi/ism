"use client";

import { motion } from "motion/react";
import { RevealHeading } from "@/components/home/value-proposition/reveal-heading";
import { labelReveal, bodyFade, ease } from "@/components/animations/variants";

interface PageHeroProps {
  label: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
  align?: "center" | "left";
  headingClass?: string;
}

export function PageHero({
  label,
  title,
  description,
  children,
  align = "center",
  headingClass = "text-h2",
}: PageHeroProps) {
  const isLeft = align === "left";

  return (
    <section className="ism-grain relative overflow-hidden bg-[var(--ism-bg)] px-6 pt-32 pb-16 lg:px-12 lg:pt-40 lg:pb-24 xl:px-16">
      {/* Ambient emerald glow */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <motion.div
          className="absolute left-1/2 top-[20%] h-[600px] w-[600px] -translate-x-1/2 rounded-full lg:h-[800px] lg:w-[800px]"
          style={{
            background:
              "radial-gradient(circle, rgba(4,120,87,0.1) 0%, rgba(4,120,87,0.03) 40%, transparent 70%)",
            filter: "blur(80px)",
          }}
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      {/* Dot grid overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--ism-fg) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div
        className={`relative z-10 ${isLeft ? "max-w-4xl" : "text-center"}`}
      >
        <motion.p
          className="text-sm font-semibold uppercase tracking-[0.25em] text-[var(--ism-accent)]"
          variants={labelReveal}
          initial="hidden"
          animate="visible"
        >
          {label}
        </motion.p>

        <RevealHeading
          text={title}
          className={`${headingClass} mt-4 text-[var(--ism-fg)]`}
        />

        {description && (
          <motion.p
            className={`text-body-lg mt-5 max-w-xl text-[var(--ism-fg-muted)] ${
              !isLeft ? "mx-auto max-w-2xl" : ""
            }`}
            variants={bodyFade}
            initial="hidden"
            animate="visible"
          >
            {description}
          </motion.p>
        )}

        {children}
      </div>

      {/* Bottom divider */}
      <motion.div
        className="absolute bottom-0 left-1/2 h-px w-full max-w-md -translate-x-1/2 bg-gradient-to-r from-transparent via-[var(--ism-accent)]/20 to-transparent"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease }}
      />
    </section>
  );
}
