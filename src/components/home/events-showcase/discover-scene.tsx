"use client";

import { motion } from "motion/react";
import { HiClock, HiMapPin, HiUserGroup } from "react-icons/hi2";
import { TiltWrapper } from "@/components/ui/tilt-wrapper";
import { ease } from "@/components/animations/variants";
import { cityFilters, categoryFilters, mockEvents } from "./data";
import type { MockEvent } from "./data";
import { SceneWrapper } from "./scene-wrapper";

function FeaturedCard({ evt }: { evt: MockEvent }) {
  return (
    <TiltWrapper className="sm:col-span-3 sm:row-span-2">
      <motion.div
        className="relative h-full overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.03]"
        initial={{ opacity: 0, y: 24, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease, delay: 0.5 }}
      >
        {/* Gradient cover */}
        <div className="relative h-28 sm:h-36" style={{ background: evt.imageGradient }}>
          <span className="absolute left-3 top-3 rounded-full bg-amber-500 px-2.5 py-0.5 text-[10px] font-bold text-white shadow-lg shadow-amber-500/30">
            Featured
          </span>

          <motion.div
            className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(245,158,11,0.35) 0%, transparent 70%)",
            }}
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="flex h-full items-center justify-center">
            <span className="text-4xl font-black tracking-tight text-white/10">
              EVENT
            </span>
          </div>

          <div className="absolute bottom-3 right-3 flex items-center gap-1 rounded-full bg-black/40 px-2.5 py-1 backdrop-blur-sm">
            <HiUserGroup className="h-3 w-3 text-white/70" />
            <span className="text-[10px] font-semibold text-white/90">
              {evt.attendees} going
            </span>
          </div>
        </div>

        <div className="p-4">
          <span className="inline-block rounded-full bg-amber-500/15 px-2 py-0.5 text-[10px] font-semibold text-amber-400">
            {evt.category}
          </span>
          <h4 className="mt-2 text-sm font-semibold leading-snug text-white">
            {evt.title}
          </h4>
          <div className="mt-2 flex items-center gap-3 text-[11px] text-white/50">
            <span className="flex items-center gap-1">
              <HiClock className="h-3 w-3 text-amber-500/70" />
              {evt.date} &middot; {evt.time}
            </span>
            <span className="flex items-center gap-1">
              <HiMapPin className="h-3 w-3 text-amber-500/70" />
              {evt.location}
            </span>
          </div>
        </div>
      </motion.div>
    </TiltWrapper>
  );
}

function CompactCard({ evt, index }: { evt: MockEvent; index: number }) {
  return (
    <TiltWrapper className="sm:col-span-2">
      <motion.div
        className="relative h-full overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.03]"
        initial={{ opacity: 0, y: 24, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease, delay: 0.65 + index * 0.15 }}
      >
        <div className="h-16 sm:h-20" style={{ background: evt.imageGradient }}>
          <div className="flex h-full items-center justify-center">
            <span className="text-lg font-black tracking-tight text-white/10">
              EVENT
            </span>
          </div>
        </div>

        <div className="p-3">
          <div className="flex items-center justify-between">
            <span className="inline-block rounded-full bg-white/[0.06] px-2 py-0.5 text-[10px] font-semibold text-white/60">
              {evt.category}
            </span>
            <span className="flex items-center gap-1 text-[10px] text-white/40">
              <HiUserGroup className="h-2.5 w-2.5" />
              {evt.attendees}
            </span>
          </div>
          <h4 className="mt-1.5 text-xs font-semibold leading-snug text-white/90">
            {evt.title}
          </h4>
          <div className="mt-1.5 flex items-center gap-2 text-[10px] text-white/40">
            <span className="flex items-center gap-0.5">
              <HiClock className="h-2.5 w-2.5" />
              {evt.date}
            </span>
            <span className="flex items-center gap-0.5">
              <HiMapPin className="h-2.5 w-2.5" />
              {evt.location}
            </span>
          </div>
        </div>
      </motion.div>
    </TiltWrapper>
  );
}

export function DiscoverScene() {
  const featured = mockEvents[0];
  const compact = mockEvents.slice(1);

  return (
    <SceneWrapper>
      <div className="space-y-5">
        {/* City filter pills */}
        <div>
          <span className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.15em] text-white/40">
            City
          </span>
          <div className="flex flex-wrap gap-1.5">
            {cityFilters.map((city, i) => (
              <motion.span
                key={city}
                initial={{ opacity: 0, scale: 0.8, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.4, ease, delay: i * 0.06 }}
                className={`rounded-full px-3 py-1.5 text-xs font-medium ${
                  city === "Sydney"
                    ? "bg-amber-500 text-white shadow-lg shadow-amber-500/20"
                    : "border border-white/[0.08] text-white/40"
                }`}
              >
                {city}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Category filter pills */}
        <div>
          <span className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.15em] text-white/40">
            Category
          </span>
          <div className="flex flex-wrap gap-1.5">
            {categoryFilters.map((cat, i) => (
              <motion.span
                key={cat}
                initial={{ opacity: 0, scale: 0.8, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.4, ease, delay: 0.25 + i * 0.06 }}
                className={`rounded-full px-3 py-1.5 text-xs font-medium ${
                  cat === "Social"
                    ? "bg-amber-500 text-white shadow-lg shadow-amber-500/20"
                    : "border border-white/[0.08] text-white/40"
                }`}
              >
                {cat}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Event cards — featured + 2 compact */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-5">
          <FeaturedCard evt={featured} />
          {compact.map((evt, i) => (
            <CompactCard key={evt.title} evt={evt} index={i} />
          ))}
        </div>
      </div>
    </SceneWrapper>
  );
}
