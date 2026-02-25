"use client";

import Link from "next/link";
import { motion } from "motion/react";
import {
  HiChatBubbleLeftRight,
  HiUserGroup,
  HiCalendarDays,
} from "react-icons/hi2";
import { PageHero } from "@/components/layout/page-hero";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Counter } from "@/components/animations/counter";
import {
  ease,
  cardVariants,
  labelReveal,
  bodyFade,
} from "@/components/animations/variants";
import { RevealHeading } from "@/components/home/value-proposition/reveal-heading";

const features = [
  {
    icon: HiChatBubbleLeftRight,
    title: "Forum Discussions",
    description:
      "Ask questions, share advice, and connect with students across Australia in our moderated forum.",
    gradient: "from-emerald-500/20 via-emerald-400/10 to-transparent",
  },
  {
    icon: HiUserGroup,
    title: "Local Groups",
    description:
      "Find students in your city, campus, or course. Join local groups to meet people who get it.",
    gradient: "from-sky-500/20 via-cyan-400/10 to-transparent",
  },
  {
    icon: HiCalendarDays,
    title: "Events",
    description:
      "Discover student meetups, career fairs, cultural events, and social gatherings near you.",
    gradient: "from-violet-500/20 via-purple-400/10 to-transparent",
  },
];

const communityStats = [
  {
    value: "833,000+",
    target: 833000,
    label: "Students",
    format: (n: number) => Math.round(n).toLocaleString() + "+",
  },
  {
    value: "247",
    target: 247,
    label: "Online now",
    format: (n: number) => Math.round(n).toString(),
  },
  {
    value: "14",
    target: 14,
    label: "New posts today",
    format: (n: number) => Math.round(n).toString(),
  },
];

export default function CommunityPage() {
  return (
    <>
      <PageHero
        label="Community"
        title="You're not alone in this."
        description="Connect with international students who understand exactly what you're going through."
      />

      {/* Features */}
      <section className="bg-[var(--ism-bg)] px-6 py-24 lg:px-12 lg:py-36 xl:px-16">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 md:grid-cols-3">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                variants={cardVariants}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
              >
                <GlassCard className="p-8" gradient={feature.gradient}>
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-xl"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(4,120,87,0.15) 0%, rgba(16,185,129,0.08) 100%)",
                    }}
                  >
                    <feature.icon className="h-6 w-6 text-[var(--ism-accent)]" />
                  </div>
                  <h3 className="mt-5 text-xl font-bold text-[var(--ism-fg)]">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--ism-fg-muted)]">
                    {feature.description}
                  </p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-[var(--ism-bg)] px-6 py-16 lg:px-12 lg:py-24 xl:px-16">
        <div className="mx-auto max-w-4xl">
          <motion.div
            className="grid grid-cols-3 gap-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
          >
            {communityStats.map((stat) => (
              <div key={stat.label}>
                <Counter
                  value={stat.value}
                  target={stat.target}
                  format={stat.format}
                  className="text-3xl font-bold text-[var(--ism-accent)] lg:text-4xl"
                />
                <p className="mt-1 text-sm text-[var(--ism-fg-muted)]">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
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
            Get Involved
          </motion.p>
          <RevealHeading
            text="Join the conversation."
            className="text-h2 mt-4 text-[var(--ism-fg)]"
          />
          <motion.p
            className="text-body-lg mt-5 text-[var(--ism-fg-muted)]"
            variants={bodyFade}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            Head over to the Forum to start asking questions, sharing tips, and
            meeting fellow students.
          </motion.p>
          <motion.div
            className="mt-8"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease, delay: 0.6 }}
          >
            <Button variant="ism" size="lg" asChild>
              <Link href="/forum">Visit the Forum</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  );
}
