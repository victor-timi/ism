"use client";

import { motion } from "motion/react";
import { HiMapPin, HiBookmark } from "react-icons/hi2";
import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import { cardVariants } from "@/components/animations/variants";
import type { Listing } from "./mock-data";

const categoryColors: Record<string, string> = {
  jobs: "from-emerald-500/20 via-emerald-400/10 to-transparent",
  housing: "from-sky-500/20 via-cyan-400/10 to-transparent",
  discounts: "from-violet-500/20 via-purple-400/10 to-transparent",
};

const categoryBadgeStyle: Record<string, string> = {
  jobs: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  housing: "bg-sky-500/10 text-sky-600 dark:text-sky-400",
  discounts: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
};

export function ListingCard({
  listing,
  index,
}: {
  listing: Listing;
  index: number;
}) {
  const priceDisplay = listing.salary || listing.price || listing.discount;

  return (
    <motion.div
      variants={cardVariants}
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-30px" }}
    >
      <GlassCard
        className="p-6"
        gradient={categoryColors[listing.category]}
      >
        <div className="flex items-start justify-between">
          <Badge
            variant="secondary"
            className={categoryBadgeStyle[listing.category]}
          >
            {listing.category.charAt(0).toUpperCase() +
              listing.category.slice(1)}
          </Badge>
          <button
            className="text-[var(--ism-fg-muted)] transition-colors hover:text-[var(--ism-accent)]"
            aria-label="Bookmark listing"
          >
            <HiBookmark className="h-5 w-5" />
          </button>
        </div>

        <h3 className="mt-4 text-lg font-bold text-[var(--ism-fg)]">
          {listing.title}
        </h3>
        <p className="mt-1 text-sm text-[var(--ism-fg-muted)]">
          {listing.company}
        </p>

        <div className="mt-3 flex items-center gap-1.5 text-xs text-[var(--ism-fg-muted)]">
          <HiMapPin className="h-3.5 w-3.5" />
          {listing.location}
        </div>

        <div className="mt-4 flex items-end justify-between">
          <span className="text-base font-bold text-[var(--ism-accent)]">
            {priceDisplay}
          </span>
          <span className="text-xs text-[var(--ism-fg-muted)]">
            {listing.posted}
          </span>
        </div>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {listing.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-[var(--ism-fg)]/5 px-2.5 py-0.5 text-xs text-[var(--ism-fg-muted)]"
            >
              {tag}
            </span>
          ))}
        </div>
      </GlassCard>
    </motion.div>
  );
}
