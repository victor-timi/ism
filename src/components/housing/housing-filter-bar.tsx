"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useCallback } from "react";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cities, roomTypes, priceRanges } from "./data";

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
          <Button
            key={item.value}
            variant={active === item.value ? "secondary" : "outline"}
            size="sm"
            onClick={() => onSelect(paramKey, item.value)}
            className={
              active === item.value
                ? "rounded-full bg-sky-500/15 text-sky-600 dark:text-sky-400 border-sky-500/25 shadow-sm shadow-sky-500/10 hover:bg-sky-500/20"
                : "rounded-full text-[var(--ism-fg-muted)] hover:border-sky-500/30 hover:text-sky-500"
            }
          >
            {item.label}
          </Button>
        ))}
      </div>
    </div>
  );
}

export function HousingFilterBar() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const activeCity = searchParams.get("city") || "all";
  const activeRoomType = searchParams.get("roomType") || "all";
  const activePriceRange = searchParams.get("price") || "all";
  const searchQuery = searchParams.get("q") || "";

  const updateParams = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value === "all" || value === "") {
        params.delete(key);
      } else {
        params.set(key, value);
      }
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [searchParams, router, pathname],
  );

  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      updateParams("q", e.target.value);
    },
    [updateParams],
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
      {/* Search input */}
      <div className="relative mb-4">
        <HiMagnifyingGlass className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--ism-fg-muted)]" />
        <Input
          type="text"
          placeholder="Search suburbs, providers, or keywords..."
          defaultValue={searchQuery}
          onChange={handleSearch}
          className="h-10 rounded-xl border-white/[0.08] bg-transparent pl-10 text-[var(--ism-fg)] placeholder:text-[var(--ism-fg-muted)]/60 focus-visible:border-sky-500/40 focus-visible:ring-sky-500/20"
        />
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:gap-8">
        <PillGroup
          label="City"
          items={cities}
          active={activeCity}
          paramKey="city"
          onSelect={updateParams}
        />
        <PillGroup
          label="Room Type"
          items={roomTypes}
          active={activeRoomType}
          paramKey="roomType"
          onSelect={updateParams}
        />
        <PillGroup
          label="Price Range"
          items={priceRanges}
          active={activePriceRange}
          paramKey="price"
          onSelect={updateParams}
        />
      </div>
    </div>
  );
}
