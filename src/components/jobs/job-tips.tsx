"use client";

import { motion } from "motion/react";
import { HiShieldCheck, HiClock, HiDocumentText } from "react-icons/hi2";
import { GlassCard } from "@/components/ui/glass-card";
import { cardVariants } from "@/components/animations/variants";
import { tips } from "./data";

const iconMap = {
  shield: HiShieldCheck,
  clock: HiClock,
  document: HiDocumentText,
} as const;

export function JobTips() {
  return (
    <section className="bg-[var(--ism-bg)] px-6 py-12 lg:px-12 lg:py-16 xl:px-16">
      <h2 className="text-xl font-bold text-[var(--ism-fg)]">
        Quick Tips: Before you start working
      </h2>
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {tips.map((tip, i) => {
          const Icon = iconMap[tip.icon];
          return (
            <motion.div
              key={tip.title}
              variants={cardVariants}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-30px" }}
            >
              <GlassCard gradient="from-emerald-500/20 via-teal-500/10 to-transparent" tiltStrength={5}>
                <div className="p-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10">
                    <Icon className="h-5 w-5 text-emerald-500" />
                  </div>
                  <h3 className="mt-4 text-base font-bold text-[var(--ism-fg)]">
                    {tip.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--ism-fg-muted)]">
                    {tip.description}
                  </p>
                </div>
              </GlassCard>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
