"use client";

import { motion } from "motion/react";
import { HiCalendarDays, HiEnvelope } from "react-icons/hi2";
import { PageHero } from "@/components/layout/page-hero";
import { bodyFade, ease, labelReveal } from "@/components/animations/variants";
import { sections } from "./data";

export default function TermsPage() {
  return (
    <>
      {/* Hero */}
      <PageHero
        align="left"
        headingClass="text-h1"
        className="max-w-5xl"
        label="Terms of Service"
        title="Terms you can actually understand."
        description="Plain-language terms that protect both you and the platform."
      />

      {/* Metadata bar */}
      <motion.div
        className="border-y border-[var(--ism-border)] bg-[var(--ism-bg)] px-6 py-5 lg:px-12 xl:px-16"
        variants={bodyFade}
        initial="hidden"
        animate="visible"
      >
        <div className="flex flex-col items-center justify-center gap-6 sm:flex-row sm:gap-12 lg:gap-16">
          <div className="flex items-center gap-3">
            <HiCalendarDays className="h-5 w-5 shrink-0 text-emerald-500" />
            <div>
              <span className="text-sm font-bold text-[var(--ism-fg)]">
                Last updated
              </span>
              <span className="ml-1.5 text-xs text-[var(--ism-fg-muted)]">
                February 2026
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <HiEnvelope className="h-5 w-5 shrink-0 text-emerald-500" />
            <div>
              <span className="text-sm font-bold text-[var(--ism-fg)]">
                legal@ism.org.au
              </span>
              <span className="ml-1.5 text-xs text-[var(--ism-fg-muted)]">
                Questions? Reach out
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Content */}
      <section className="bg-[var(--ism-bg)] px-6 py-24 lg:px-12 lg:py-36 xl:px-16">
        <div className="grid gap-12 lg:grid-cols-[220px_1fr] lg:gap-16">
          {/* Table of Contents — sticky sidebar */}
          <motion.aside
            className="lg:sticky lg:top-32 lg:self-start"
            variants={bodyFade}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.p
              className="text-sm font-semibold uppercase tracking-[0.25em] text-[var(--ism-accent)]"
              variants={labelReveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
            >
              Contents
            </motion.p>
            <nav className="mt-4 space-y-2">
              {sections.map((s) => (
                <a
                  key={s.number}
                  href={`#terms-${s.number}`}
                  className="block text-sm text-[var(--ism-fg-muted)] transition-colors hover:text-[var(--ism-accent)]"
                >
                  <span className="mr-2 font-mono text-[var(--ism-accent)]">
                    {s.number}
                  </span>
                  {s.title}
                </a>
              ))}
            </nav>
          </motion.aside>

          {/* Sections */}
          <div className="space-y-12">
            {sections.map((section, i) => (
              <motion.div
                key={section.number}
                id={`terms-${section.number}`}
                className="scroll-mt-32"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, ease, delay: i * 0.05 }}
              >
                <div className="flex items-baseline gap-4">
                  <span className="font-mono text-3xl font-bold text-[var(--ism-accent)]/20">
                    {section.number}
                  </span>
                  <h2 className="text-xl font-bold text-[var(--ism-fg)]">
                    {section.title}
                  </h2>
                </div>
                <div className="mt-3 h-px bg-gradient-to-r from-[var(--ism-accent)]/20 to-transparent" />
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
