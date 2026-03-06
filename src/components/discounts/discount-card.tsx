"use client";

import { motion } from "motion/react";
import { HiBookmark } from "react-icons/hi2";
import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cardVariants } from "@/components/animations/variants";
import type { MockDiscount } from "./data";

export function DiscountCard({
  deal,
  index,
}: {
  deal: MockDiscount;
  index: number;
}) {
  return (
    <motion.div
      variants={cardVariants}
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-30px" }}
    >
      <GlassCard
        gradient="from-orange-500/20 via-amber-500/10 to-transparent"
        tiltStrength={0}
      >
        <div className="flex h-full flex-col p-6">
          {/* Company row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/10 text-sm font-bold text-orange-600 dark:text-orange-400">
                {deal.company.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-medium text-[var(--ism-fg)]">
                  {deal.company}
                </p>
                <p className="text-xs text-[var(--ism-fg-muted)]">
                  {deal.category.charAt(0).toUpperCase() +
                    deal.category.slice(1)}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon-sm"
              className="text-[var(--ism-fg-muted)] hover:text-orange-500"
            >
              <HiBookmark className="h-5 w-5" />
            </Button>
          </div>

          {/* Title + Discount */}
          <h3 className="mt-4 text-lg font-bold text-[var(--ism-fg)]">
            {deal.title}
          </h3>
          <p className="mt-1 text-xl font-bold text-orange-600 dark:text-orange-400">
            {deal.discount}
          </p>

          {/* Description + Tags */}
          <p className="mt-2 text-xs text-[var(--ism-fg-muted)]">
            {deal.description}
          </p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {deal.tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="bg-orange-500/10 text-orange-600 dark:text-orange-400 text-[10px]"
              >
                {tag}
              </Badge>
            ))}
            <Badge
              variant="secondary"
              className="bg-[var(--ism-fg)]/5 text-[var(--ism-fg-muted)] text-[10px]"
            >
              {deal.discountType
                .split("-")
                .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                .join(" ")}
            </Badge>
          </div>

          {/* CTA */}
          <div className="mt-auto pt-5">
            <Button
              variant="outline"
              className="w-full border-orange-500/20 text-[var(--ism-fg)] hover:border-orange-500/40 hover:text-orange-500"
            >
              View Deal
            </Button>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}
