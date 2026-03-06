"use client";

import { motion } from "motion/react";
import { HiMapPin, HiBookmark } from "react-icons/hi2";
import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cardVariants } from "@/components/animations/variants";
import type { MockJob } from "./data";

export function JobCard({ job, index }: { job: MockJob; index: number }) {
  return (
    <motion.div
      variants={cardVariants}
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-30px" }}
    >
      <GlassCard gradient="from-emerald-500/20 via-teal-500/10 to-transparent" tiltStrength={0}>
        <div className="flex h-full flex-col p-6">
          {/* Company row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-sm font-bold text-emerald-600 dark:text-emerald-400">
                {job.company.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-medium text-[var(--ism-fg)]">
                  {job.company}
                </p>
                <p className="flex items-center gap-1 text-xs text-[var(--ism-fg-muted)]">
                  <HiMapPin className="h-3 w-3" />
                  {job.location}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon-sm"
              className="text-[var(--ism-fg-muted)] hover:text-emerald-500"
            >
              <HiBookmark className="h-5 w-5" />
            </Button>
          </div>

          {/* Title + Salary */}
          <h3 className="mt-4 text-lg font-bold text-[var(--ism-fg)]">
            {job.title}
          </h3>
          <p className="mt-1 text-xl font-bold text-emerald-600 dark:text-emerald-400">
            {job.salary}
          </p>

          {/* Posted + Tags */}
          <p className="mt-2 text-xs text-[var(--ism-fg-muted)]">
            Posted {job.posted}
          </p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {job.tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px]"
              >
                {tag}
              </Badge>
            ))}
            <Badge
              variant="secondary"
              className="bg-[var(--ism-fg)]/5 text-[var(--ism-fg-muted)] text-[10px]"
            >
              {job.type.charAt(0).toUpperCase() + job.type.slice(1)}
            </Badge>
          </div>

          {/* CTA */}
          <div className="mt-auto pt-5">
            <Button
              variant="outline"
              className="w-full border-emerald-500/20 text-[var(--ism-fg)] hover:border-emerald-500/40 hover:text-emerald-500"
            >
              View Details
            </Button>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}
