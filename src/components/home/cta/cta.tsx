"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { RevealHeading } from "@/components/home/value-proposition/reveal-heading";
import {
  ease,
  labelReveal,
  bodyFade,
} from "@/components/home/value-proposition/variants";

export function CTA() {
  return (
    <section className="relative overflow-hidden bg-[var(--ism-bg)] px-6 py-24 lg:px-12 lg:py-36 xl:px-16">
      {/* Subtle top divider */}
      <motion.div
        className="absolute left-1/2 top-0 h-px w-full max-w-md -translate-x-1/2 bg-gradient-to-r from-transparent via-[var(--ism-accent)]/20 to-transparent"
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: false }}
        transition={{ duration: 1.2, ease }}
      />

      {/* Content — centered */}
      <div className="relative z-10 flex flex-col items-center text-center">
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
          text="Ready to make student life easier?"
          className="text-h2 mt-4 text-[var(--ism-fg)]"
        />

        <motion.p
          className="text-body-lg mt-5 max-w-xl text-[var(--ism-fg-muted)]"
          variants={bodyFade}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-60px" }}
        >
          Join 833,000+ international students. One platform for jobs, housing,
          and deals — completely free.
        </motion.p>

        <motion.div
          className="mt-8 flex items-center gap-3"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.5, ease, delay: 0.6 }}
        >
          <Button variant="ism" size="lg" asChild>
            <Link href="/signup">Sign Up Free</Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/hub">Explore the Hub</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
