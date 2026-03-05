"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useCallback } from "react";

const cities = [
  { label: "All", value: "all" },
  { label: "Sydney", value: "sydney" },
  { label: "Melbourne", value: "melbourne" },
  { label: "Brisbane", value: "brisbane" },
  { label: "Perth", value: "perth" },
  { label: "Adelaide", value: "adelaide" },
];

const categories = [
  { label: "All", value: "all" },
  { label: "Social", value: "social" },
  { label: "Career", value: "career" },
  { label: "Academic", value: "academic" },
  { label: "Cultural", value: "cultural" },
  { label: "Sports", value: "sports" },
  { label: "Workshop", value: "workshop" },
];

const dateRanges = [
  { label: "All Upcoming", value: "all" },
  { label: "This Week", value: "week" },
  { label: "This Month", value: "month" },
];

function PillGroup({
  label,
  items,
  active,
  paramKey,
  onSelect,
}: {
  label: string;
  items: { label: string; value: string }[];
  active: string;
  paramKey: string;
  onSelect: (key: string, value: string) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[var(--ism-fg-muted)]">
        {label}
      </span>
      <div className="flex flex-wrap gap-1.5">
        {items.map((item) => (
          <button
            key={item.value}
            onClick={() => onSelect(paramKey, item.value)}
            className={`rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-200 ${
              active === item.value
                ? "bg-amber-500 text-white shadow-lg shadow-amber-500/20"
                : "border border-white/[0.08] text-[var(--ism-fg-muted)] hover:border-amber-500/30 hover:text-amber-500"
            }`}
            style={
              active !== item.value
                ? {
                    background:
                      "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
                  }
                : undefined
            }
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export function EventFilterBar() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const activeCity = searchParams.get("city") || "all";
  const activeCategory = searchParams.get("category") || "all";
  const activeDateRange = searchParams.get("date") || "all";

  const handleSelect = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value === "all") {
        params.delete(key);
      } else {
        params.set(key, value);
      }
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [searchParams, router, pathname],
  );

  return (
    <div
      className="rounded-2xl border border-white/[0.08] p-5"
      style={{
        background:
          "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
        backdropFilter: "blur(12px)",
      }}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:gap-8">
        <PillGroup
          label="City"
          items={cities}
          active={activeCity}
          paramKey="city"
          onSelect={handleSelect}
        />
        <PillGroup
          label="Category"
          items={categories}
          active={activeCategory}
          paramKey="category"
          onSelect={handleSelect}
        />
        <PillGroup
          label="When"
          items={dateRanges}
          active={activeDateRange}
          paramKey="date"
          onSelect={handleSelect}
        />
      </div>
    </div>
  );
}
