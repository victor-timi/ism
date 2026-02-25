"use client";

import { motion } from "motion/react";
import { GlassCard } from "@/components/ui/glass-card";
import { RevealHeading } from "@/components/home/value-proposition/reveal-heading";
import {
  ease,
  labelReveal,
  bodyFade,
  cardVariants,
} from "@/components/home/value-proposition/variants";
import { steps } from "./data";
import { StepConnectorLine } from "./step-connector";

export function GettingStarted() {
  return (
    <section className="relative overflow-hidden bg-[var(--ism-bg)] px-6 py-24 lg:px-12 lg:py-36 xl:px-16">
      {/* Subtle divider at top */}
      <motion.div
        className="absolute left-1/2 top-0 h-px w-full max-w-md -translate-x-1/2 bg-gradient-to-r from-transparent via-[var(--ism-accent)]/20 to-transparent"
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: false }}
        transition={{ duration: 1.2, ease }}
      />

      <div className="relative z-10">
        {/* Header — left aligned */}
        <div className="max-w-2xl">
          <motion.p
            className="text-sm font-semibold uppercase tracking-[0.25em] text-[var(--ism-accent)]"
            variants={labelReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-60px" }}
          >
            Get Started
          </motion.p>

          <RevealHeading
            text="From zero to sorted in four steps."
            className="text-h2 mt-4 text-[var(--ism-fg)]"
          />

          <motion.p
            className="text-body-lg mt-5 max-w-xl text-[var(--ism-fg-muted)]"
            variants={bodyFade}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-60px" }}
          >
            No five different tabs. No guesswork. Create an account and
            everything international students need in Australia is right there.
          </motion.p>
        </div>

        {/* Step cards */}
        <div className="relative mt-16 lg:mt-24">
          <StepConnectorLine />

          <div className="relative z-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, margin: "-40px" }}
              >
                <GlassCard tiltStrength={8} gradient={step.gradient}>
                  <div className="relative flex flex-col p-8 lg:p-9">
                    {/* Decorative step number */}
                    <span
                      className={`pointer-events-none absolute right-5 top-4 text-7xl font-black leading-none opacity-[0.06] lg:text-8xl ${step.accentColor}`}
                    >
                      {step.number}
                    </span>

                    {/* Icon in per-step colored container */}
                    <div
                      className="flex h-13 w-13 items-center justify-center rounded-xl border border-white/[0.1] transition-transform duration-500 group-hover:scale-110"
                      style={{
                        background: `linear-gradient(135deg, ${step.iconBg} 0%, ${step.iconBgSubtle} 100%)`,
                        backdropFilter: "blur(12px)",
                      }}
                    >
                      <step.icon className={`h-6 w-6 ${step.accentColor}`} />
                    </div>

                    {/* Heading */}
                    <h3 className="mt-6 text-lg font-semibold tracking-tight text-[var(--ism-fg)] lg:text-xl">
                      {step.heading}
                    </h3>

                    {/* Description */}
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--ism-fg-muted)]">
                      {step.description}
                    </p>

                    {/* Micro highlight pill */}
                    <div className="mt-5">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] px-3 py-1 text-xs font-medium ${step.accentColor}`}
                        style={{
                          background: `linear-gradient(135deg, ${step.iconBg} 0%, ${step.iconBgSubtle} 100%)`,
                        }}
                      >
                        <span
                          className={`inline-block h-1.5 w-1.5 rounded-full ${step.accentColor}`}
                          style={{ background: "currentColor" }}
                        />
                        {step.highlight}
                      </span>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
