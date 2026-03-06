"use client";

import { motion } from "motion/react";
import { HiMapPin } from "react-icons/hi2";
import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { MockJob } from "./data";

export function FeaturedJobBanner({ job }: { job: MockJob }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <GlassCard gradient="from-emerald-500/20 via-teal-500/10 to-transparent" tiltStrength={0}>
        <div className="flex flex-col md:flex-row">
          {/* Company info area */}
          <div className="flex shrink-0 flex-col items-center justify-center border-b border-white/[0.06] p-7 md:w-64 md:border-b-0 md:border-r lg:w-72">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10 text-2xl font-bold text-emerald-600 dark:text-emerald-400">
              {job.company.charAt(0)}
            </div>
            <p className="mt-3 text-center text-sm font-semibold text-[var(--ism-fg)]">
              {job.company}
            </p>
            <p className="mt-1 flex items-center gap-1 text-xs text-[var(--ism-fg-muted)]">
              <HiMapPin className="h-3 w-3" />
              {job.location}
            </p>
          </div>

          {/* Content */}
          <div className="flex flex-1 flex-col justify-center p-7 lg:p-9">
            <div className="flex items-center gap-2">
              <Badge className="bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/20">
                Hot Job
              </Badge>
              <Badge
                variant="secondary"
                className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
              >
                {job.type.charAt(0).toUpperCase() + job.type.slice(1)}
              </Badge>
            </div>

            <h3 className="mt-4 text-2xl font-bold tracking-tight text-[var(--ism-fg)] lg:text-3xl">
              {job.title}
            </h3>

            <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-[var(--ism-fg-muted)]">
              <span className="text-xl font-bold text-emerald-600 dark:text-emerald-400">
                {job.salary}
              </span>
              <span className="flex items-center gap-1.5">
                <HiMapPin className="h-4 w-4" />
                {job.location}
              </span>
              <span>Posted {job.posted}</span>
            </div>

            <div className="mt-3 flex flex-wrap gap-1.5">
              {job.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                >
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="mt-6">
              <Button variant="ism" size="lg">
                Apply Now
              </Button>
            </div>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}
