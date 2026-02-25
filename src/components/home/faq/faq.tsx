"use client";

import { motion } from "motion/react";
import { RevealHeading } from "@/components/home/value-proposition/reveal-heading";
import {
  ease,
  labelReveal,
  bodyFade,
} from "@/components/home/value-proposition/variants";
import { faqs } from "./data";
import { FaqItem } from "./faq-item";

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease },
  },
};

export function FAQ() {
  const mid = Math.ceil(faqs.length / 2);
  const leftFaqs = faqs.slice(0, mid);
  const rightFaqs = faqs.slice(mid);

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
            FAQ
          </motion.p>

          <RevealHeading
            text="Questions? We've got answers."
            className="text-h2 mt-4 text-[var(--ism-fg)]"
          />

          <motion.p
            className="text-body-lg mt-5 max-w-xl text-[var(--ism-fg-muted)]"
            variants={bodyFade}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-60px" }}
          >
            Everything you need to know before getting started.
          </motion.p>
        </div>

        {/* FAQ list — 2-column grid on large screens */}
        <div className="mt-12 grid grid-cols-1 gap-x-12 lg:mt-16 lg:grid-cols-2 lg:gap-x-16">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-40px" }}
          >
            {leftFaqs.map((faq) => (
              <motion.div key={faq.number} variants={fadeUpVariants}>
                <FaqItem
                  number={faq.number}
                  question={faq.question}
                  answer={faq.answer}
                />
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-40px" }}
          >
            {rightFaqs.map((faq) => (
              <motion.div key={faq.number} variants={fadeUpVariants}>
                <FaqItem
                  number={faq.number}
                  question={faq.question}
                  answer={faq.answer}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
