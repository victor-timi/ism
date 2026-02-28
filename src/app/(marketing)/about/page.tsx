"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { PageHero } from "@/components/layout/page-hero";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Counter } from "@/components/animations/counter";
import {
  ease,
  bodyFade,
  cardVariants,
  labelReveal,
} from "@/components/animations/variants";
import { RevealHeading } from "@/components/home/value-proposition/reveal-heading";
import { ROUTES } from "@/lib/routes";
import { stats, offerings, timeline } from "./data";

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <PageHero
        label="About Us"
        title="Built for students, by students."
        description="ISM is on a mission to make student life in Australia easier — one listing at a time."
      />

      {/* Mission Section */}
      <section className="bg-[var(--ism-bg)] px-6 py-24 lg:px-12 lg:py-36 xl:px-16">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <motion.p
              className="text-sm font-semibold uppercase tracking-[0.25em] text-[var(--ism-accent)]"
              variants={labelReveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
            >
              Our Mission
            </motion.p>
            <RevealHeading
              text="Making opportunities accessible."
              className="text-h2 mt-4 text-[var(--ism-fg)]"
            />
            <motion.p
              className="text-body-lg mt-5 text-[var(--ism-fg-muted)]"
              variants={bodyFade}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
            >
              Every year, hundreds of thousands of international students arrive
              in Australia full of hope — but quickly face the reality of
              fragmented job boards, overpriced housing, and scattered discounts.
              ISM brings it all together in one place, completely free.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease }}
          >
            <GlassCard
              className="p-8"
              gradient="from-emerald-500/20 via-emerald-400/10 to-transparent"
            >
              <div className="grid grid-cols-3 gap-6 text-center">
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <Counter
                      value={stat.value}
                      target={stat.target}
                      format={stat.format}
                      className="text-3xl font-bold text-[var(--ism-accent)] lg:text-4xl"
                    />
                    <p className="mt-1 text-xs text-[var(--ism-fg-muted)]">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="bg-[var(--ism-bg)] px-6 py-24 lg:px-12 lg:py-36 xl:px-16">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <motion.p
              className="text-sm font-semibold uppercase tracking-[0.25em] text-[var(--ism-accent)]"
              variants={labelReveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
            >
              What We Offer
            </motion.p>
            <RevealHeading
              text="Three pillars. One platform."
              className="text-h2 mt-4 text-[var(--ism-fg)]"
            />
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {offerings.map((item, i) => (
              <motion.div
                key={item.title}
                variants={cardVariants}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
              >
                <GlassCard className="p-8" gradient={item.gradient}>
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-xl"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(4,120,87,0.15) 0%, rgba(16,185,129,0.08) 100%)",
                    }}
                  >
                    <item.icon className="h-6 w-6 text-[var(--ism-accent)]" />
                  </div>
                  <h3 className="mt-5 text-xl font-bold text-[var(--ism-fg)]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--ism-fg-muted)]">
                    {item.description}
                  </p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Timeline */}
      <section className="bg-[var(--ism-bg)] px-6 py-24 lg:px-12 lg:py-36 xl:px-16">
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <motion.p
              className="text-sm font-semibold uppercase tracking-[0.25em] text-[var(--ism-accent)]"
              variants={labelReveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
            >
              Our Story
            </motion.p>
            <RevealHeading
              text="How we got here."
              className="text-h2 mt-4 text-[var(--ism-fg)]"
            />
          </div>

          <div className="relative mt-16">
            {/* Connecting line */}
            <div className="absolute left-6 top-0 bottom-0 w-px bg-[var(--ism-border)] md:left-8" />

            <div className="space-y-12">
              {timeline.map((step, i) => (
                <motion.div
                  key={step.title}
                  className="relative flex gap-6 md:gap-8"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.6, ease, delay: i * 0.1 }}
                >
                  <div
                    className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl md:h-16 md:w-16"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(4,120,87,0.15) 0%, rgba(16,185,129,0.08) 100%)",
                    }}
                  >
                    <step.icon className="h-6 w-6 text-[var(--ism-accent)]" />
                  </div>
                  <div className="pt-1">
                    <h3 className="text-lg font-bold text-[var(--ism-fg)]">
                      {step.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-[var(--ism-fg-muted)]">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[var(--ism-bg)] px-6 py-24 lg:px-12 lg:py-36 xl:px-16">
        <div className="mx-auto max-w-2xl text-center">
          <motion.p
            className="text-sm font-semibold uppercase tracking-[0.25em] text-[var(--ism-accent)]"
            variants={labelReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            Join Us
          </motion.p>
          <RevealHeading
            text="Ready to join the movement?"
            className="text-h2 mt-4 text-[var(--ism-fg)]"
          />
          <motion.p
            className="text-body-lg mt-5 text-[var(--ism-fg-muted)]"
            variants={bodyFade}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            Whether you&apos;re looking for your first part-time job, a place to
            call home, or just a good deal — ISM has you covered.
          </motion.p>
          <motion.div
            className="mt-8 flex items-center justify-center gap-3"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease, delay: 0.6 }}
          >
            <Button variant="ism" size="lg" asChild>
              <Link href={ROUTES.signUp}>Sign Up Free</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href={ROUTES.hub}>Explore the Hub</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  );
}
