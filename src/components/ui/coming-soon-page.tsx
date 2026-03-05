"use client";

import Link from "next/link";
import { motion } from "motion/react";
import type { ElementType } from "react";
import { PageHero } from "@/components/layout/page-hero";
import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { bodyFade, cardVariants } from "@/components/animations/variants";

interface Feature {
  title: string;
  description: string;
}

interface ComingSoonPageProps {
  label: string;
  title: string;
  description: string;
  icon?: ElementType;
  features?: Feature[];
  actionLabel?: string;
  actionHref?: string;
  compact?: boolean;
}

export function ComingSoonPage({
  label,
  title,
  description,
  icon: Icon,
  features,
  actionLabel = "Back to Home",
  actionHref = "/",
  compact = false,
}: ComingSoonPageProps) {
  if (compact) {
    return (
      <motion.div variants={bodyFade} initial="hidden" animate="visible">
        <GlassCard className="p-12">
          <div className="flex flex-col items-center text-center">
            {Icon && (
              <div
                className="flex h-16 w-16 items-center justify-center rounded-2xl"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(4,120,87,0.15) 0%, rgba(16,185,129,0.08) 100%)",
                }}
              >
                <Icon className="h-8 w-8 text-[var(--ism-accent)]" />
              </div>
            )}
            <Badge
              variant="secondary"
              className="mt-4 bg-[var(--ism-accent)]/10 px-4 py-1.5 text-sm font-semibold text-[var(--ism-accent)]"
            >
              Coming Soon
            </Badge>
            <h3 className="mt-4 text-xl font-bold text-[var(--ism-fg)]">
              {title}
            </h3>
            <p className="mt-2 max-w-sm text-sm text-[var(--ism-fg-muted)]">
              {description}
            </p>
            <Button variant="ism" size="lg" asChild className="mt-6">
              <Link href={actionHref}>{actionLabel}</Link>
            </Button>
          </div>
        </GlassCard>
      </motion.div>
    );
  }

  return (
    <>
      <PageHero label={label} title={title} description={description}>
        <motion.div
          className="mt-6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.8 }}
        >
          <Badge
            variant="secondary"
            className="bg-[var(--ism-accent)]/10 px-4 py-1.5 text-sm font-semibold text-[var(--ism-accent)]"
          >
            Coming Soon
          </Badge>
        </motion.div>
      </PageHero>

      {features && features.length > 0 && (
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
                  <GlassCard className="p-8">
                    <h3 className="text-xl font-bold text-[var(--ism-fg)]">
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
      )}

      <section className="bg-[var(--ism-bg)] px-6 py-16 lg:px-12 lg:py-24 xl:px-16">
        <motion.div
          className="mx-auto flex max-w-2xl justify-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
            delay: 0.3,
          }}
        >
          <Button variant="ism" size="lg" asChild>
            <Link href={actionHref}>{actionLabel}</Link>
          </Button>
        </motion.div>
      </section>
    </>
  );
}
