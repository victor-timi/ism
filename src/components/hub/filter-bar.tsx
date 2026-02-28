"use client";

import { HiMagnifyingGlass } from "react-icons/hi2";
import { motion } from "motion/react";
import { Input } from "@/components/ui/input";
import { ease } from "@/components/animations/variants";
import { cityFilters } from "./data";

export function FilterBar() {
  return (
    <motion.div
      className="flex flex-col gap-4 sm:flex-row sm:items-center"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease, delay: 0.2 }}
    >
      {/* Search */}
      <div className="relative flex-1">
        <HiMagnifyingGlass className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--ism-fg-muted)]" />
        <Input
          placeholder="Search listings..."
          className="h-11 pl-10"
        />
      </div>

      {/* Filter pills */}
      <div className="flex flex-wrap gap-2">
        {cityFilters.map((filter, i) => (
          <button
            key={filter}
            className={`rounded-full border px-4 py-1.5 text-xs font-medium transition-all ${
              i === 0
                ? "border-[var(--ism-accent)] bg-[var(--ism-accent)]/10 text-[var(--ism-accent)]"
                : "border-[var(--ism-border)] text-[var(--ism-fg-muted)] hover:border-[var(--ism-accent)]/30 hover:text-[var(--ism-fg)]"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>
    </motion.div>
  );
}
