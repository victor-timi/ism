"use client";

import { motion } from "motion/react";
import { PageHero } from "@/components/layout/page-hero";
import { bodyFade, ease } from "@/components/animations/variants";
import { Badge } from "@/components/ui/badge";
import { sections } from "./data";

export default function TermsPage() {
  return (
    <>
      <PageHero
        label="Terms of Service"
        title="Terms you can actually understand."
        description="Plain-language terms that protect both you and the platform."
      />

      <section className="bg-[var(--ism-bg)] px-6 py-16 lg:px-12 lg:py-24 xl:px-16">
        <div className="mx-auto max-w-3xl">
          <motion.div
            variants={bodyFade}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Badge variant="secondary" className="mb-8">
              Last updated: February 2026
            </Badge>
          </motion.div>

          <div className="space-y-10">
            {sections.map((section, i) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, ease, delay: i * 0.05 }}
              >
                <h2 className="text-xl font-bold text-[var(--ism-fg)]">
                  {section.title}
                </h2>
                <div className="mt-1 h-px bg-[var(--ism-border)]" />
                <p className="mt-4 text-sm leading-relaxed text-[var(--ism-fg-muted)]">
                  {section.content}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
