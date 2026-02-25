"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { bodyFade } from "@/components/animations/variants";

interface PremiumEmptyStateProps {
  icon: React.ElementType;
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
}

export function PremiumEmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  actionHref,
}: PremiumEmptyStateProps) {
  return (
    <motion.div
      variants={bodyFade}
      initial="hidden"
      animate="visible"
    >
      <GlassCard className="p-12">
        <div className="flex flex-col items-center text-center">
          <div
            className="flex h-16 w-16 items-center justify-center rounded-2xl"
            style={{
              background:
                "linear-gradient(135deg, rgba(4,120,87,0.15) 0%, rgba(16,185,129,0.08) 100%)",
            }}
          >
            <Icon className="h-8 w-8 text-[var(--ism-accent)]" />
          </div>
          <h3 className="mt-6 text-xl font-bold text-[var(--ism-fg)]">
            {title}
          </h3>
          <p className="mt-2 max-w-sm text-sm text-[var(--ism-fg-muted)]">
            {description}
          </p>
          {actionLabel && actionHref && (
            <Button variant="ism" size="lg" asChild className="mt-6">
              <Link href={actionHref}>{actionLabel}</Link>
            </Button>
          )}
        </div>
      </GlassCard>
    </motion.div>
  );
}
