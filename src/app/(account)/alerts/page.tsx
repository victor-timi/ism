"use client";

import { motion } from "motion/react";
import {
  HiBell,
  HiBriefcase,
  HiMapPin,
  HiClock,
} from "react-icons/hi2";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PremiumEmptyState } from "@/components/ui/premium-empty-state";
import { cardVariants } from "@/components/animations/variants";
import { exampleAlert } from "./data";

export default function AlertsPage() {
  return (
    <div>
      {/* Header with action */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-[var(--ism-fg)]">
            Your Alerts
          </h2>
          <p className="mt-1 text-sm text-[var(--ism-fg-muted)]">
            Get notified when new listings match your criteria.
          </p>
        </div>
        <Button variant="ism" size="default">
          Create Alert
        </Button>
      </div>

      {/* Example alert card */}
      <motion.div
        className="mt-8"
        variants={cardVariants}
        custom={0}
        initial="hidden"
        animate="visible"
      >
        <GlassCard
          className="p-6"
          gradient="from-emerald-500/20 via-emerald-400/10 to-transparent"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-xl"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(4,120,87,0.15) 0%, rgba(16,185,129,0.08) 100%)",
                }}
              >
                <HiBriefcase className="h-5 w-5 text-[var(--ism-accent)]" />
              </div>
              <div>
                <h3 className="font-bold text-[var(--ism-fg)]">
                  {exampleAlert.category} Alert
                </h3>
                <p className="text-xs text-[var(--ism-fg-muted)]">
                  Active
                </p>
              </div>
            </div>
            <Badge
              variant="secondary"
              className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
            >
              Active
            </Badge>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <div className="flex items-center gap-2 text-sm text-[var(--ism-fg-muted)]">
              <HiMapPin className="h-4 w-4 text-[var(--ism-accent)]" />
              {exampleAlert.location}
            </div>
            <div className="flex items-center gap-2 text-sm text-[var(--ism-fg-muted)]">
              <HiBriefcase className="h-4 w-4 text-[var(--ism-accent)]" />
              {exampleAlert.keywords}
            </div>
            <div className="flex items-center gap-2 text-sm text-[var(--ism-fg-muted)]">
              <HiClock className="h-4 w-4 text-[var(--ism-accent)]" />
              {exampleAlert.frequency}
            </div>
          </div>
        </GlassCard>
      </motion.div>

      {/* Empty state for additional alerts */}
      <div className="mt-8">
        <PremiumEmptyState
          icon={HiBell}
          title="Create more alerts"
          description="Set up alerts for housing, discounts, or specific keywords to never miss a listing."
          actionLabel="Create Your First Alert"
          actionHref="#"
        />
      </div>
    </div>
  );
}
