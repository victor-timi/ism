"use client";

import { motion } from "motion/react";
import { HiMapPin, HiBookmark } from "react-icons/hi2";
import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cardVariants } from "@/components/animations/variants";
import type { MockHousing } from "./data";

export function HousingCard({
  listing,
  index,
}: {
  listing: MockHousing;
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
        gradient="from-sky-500/20 via-cyan-500/10 to-transparent"
        tiltStrength={0}
      >
        <div className="flex h-full flex-col p-6">
          {/* Provider row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500/10 text-sm font-bold text-sky-600 dark:text-sky-400">
                {listing.provider.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-medium text-[var(--ism-fg)]">
                  {listing.provider}
                </p>
                <p className="flex items-center gap-1 text-xs text-[var(--ism-fg-muted)]">
                  <HiMapPin className="h-3 w-3" />
                  {listing.location}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon-sm"
              className="text-[var(--ism-fg-muted)] hover:text-sky-500"
            >
              <HiBookmark className="h-5 w-5" />
            </Button>
          </div>

          {/* Title + Price */}
          <h3 className="mt-4 text-lg font-bold text-[var(--ism-fg)]">
            {listing.title}
          </h3>
          <p className="mt-1 text-xl font-bold text-sky-600 dark:text-sky-400">
            {listing.price}
          </p>

          {/* Availability + Tags */}
          <p className="mt-2 text-xs text-[var(--ism-fg-muted)]">
            {listing.available}
          </p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {listing.tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="bg-sky-500/10 text-sky-600 dark:text-sky-400 text-[10px]"
              >
                {tag}
              </Badge>
            ))}
            <Badge
              variant="secondary"
              className="bg-[var(--ism-fg)]/5 text-[var(--ism-fg-muted)] text-[10px]"
            >
              {listing.roomType
                .split("-")
                .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                .join(" ")}
            </Badge>
          </div>

          {/* CTA */}
          <div className="mt-auto pt-5">
            <Button
              variant="outline"
              className="w-full border-sky-500/20 text-[var(--ism-fg)] hover:border-sky-500/40 hover:text-sky-500"
            >
              View Listing
            </Button>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}
