"use client";

import { motion } from "motion/react";
import {
  HiChatBubbleLeftRight,
  HiBolt,
  HiShieldCheck,
} from "react-icons/hi2";
import { PageHero } from "@/components/layout/page-hero";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
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
    title: "Organised Channels",
    description:
      "Dedicated channels for jobs, housing, visa questions, city-specific chats, and general discussions.",
    gradient: "from-emerald-500/20 via-emerald-400/10 to-transparent",
  },
  {
    icon: HiBolt,
    title: "Real-time Threads",
    description:
      "Instant replies, threaded conversations, and notifications so you never miss an important discussion.",
    gradient: "from-sky-500/20 via-cyan-400/10 to-transparent",
  },
  {
    icon: HiShieldCheck,
    title: "Verified Profiles",
    description:
      "Verified student profiles ensure you're getting advice from real international students, not bots.",
    gradient: "from-violet-500/20 via-purple-400/10 to-transparent",
  },
];

export default function ForumPage() {
  return (
    <>
      <PageHero
        label="Forum"
        title="The student forum."
        description="A space for international students to ask, share, and support each other."
      >
        <motion.div
          className="mt-6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease, delay: 0.8 }}
        >
          <Badge
            variant="secondary"
            className="bg-[var(--ism-accent)]/10 px-4 py-1.5 text-sm font-semibold text-[var(--ism-accent)]"
          >
            Coming Soon
          </Badge>
        </motion.div>
      </PageHero>

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

      {/* Email Signup CTA */}
      <section className="bg-[var(--ism-bg)] px-6 py-24 lg:px-12 lg:py-36 xl:px-16">
        <div className="mx-auto max-w-2xl text-center">
          <motion.p
            className="text-sm font-semibold uppercase tracking-[0.25em] text-[var(--ism-accent)]"
            variants={labelReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            Be the first to know
          </motion.p>
          <RevealHeading
            text="Get notified at launch."
            className="text-h2 mt-4 text-[var(--ism-fg)]"
          />
          <motion.p
            className="text-body-lg mt-5 text-[var(--ism-fg-muted)]"
            variants={bodyFade}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            We&apos;re building something special. Drop your email and we&apos;ll
            let you know when the forum goes live.
          </motion.p>
          <motion.form
            className="mx-auto mt-8 flex max-w-md gap-2"
            onSubmit={(e) => e.preventDefault()}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease, delay: 0.6 }}
          >
            <Input
              type="email"
              placeholder="your@email.com"
              className="h-11"
            />
            <Button type="submit" variant="ism" size="lg">
              Notify Me
            </Button>
          </motion.form>
        </div>
      </section>
    </>
  );
}
