"use client";

import { useState } from "react";
import { HiBookmark } from "react-icons/hi2";
import { PremiumEmptyState } from "@/components/ui/premium-empty-state";
import { filters } from "./data";

export default function SavedPage() {
  const [active, setActive] = useState("all");

  return (
    <div>
      {/* Filter pills */}
      <div className="flex gap-2">
        {filters.map((filter) => (
          <button
            key={filter.value}
            onClick={() => setActive(filter.value)}
            className={`flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-xs font-medium transition-all ${
              active === filter.value
                ? "border-[var(--ism-accent)] bg-[var(--ism-accent)]/10 text-[var(--ism-accent)]"
                : "border-[var(--ism-border)] text-[var(--ism-fg-muted)] hover:border-[var(--ism-accent)]/30 hover:text-[var(--ism-fg)]"
            }`}
          >
            {filter.icon && <filter.icon className="h-3.5 w-3.5" />}
            {filter.label}
          </button>
        ))}
      </div>

      {/* Empty state */}
      <div className="mt-8">
        <PremiumEmptyState
          icon={HiBookmark}
          title="No saved items yet"
          description="Browse listings in the Hub and click the bookmark icon to save them here for later."
          actionLabel="Browse the Hub"
          actionHref="/hub"
        />
      </div>
    </div>
  );
}
