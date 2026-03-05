"use client";

import { motion } from "motion/react";
import {
  HiCalendarDays,
  HiMapPin,
  HiUserGroup,
  HiClock,
  HiBookmark,
  HiShare,
  HiArrowRight,
} from "react-icons/hi2";
import { ease } from "@/components/animations/variants";
import { exploreEvent, similarEvents } from "./data";
import { SceneWrapper } from "./scene-wrapper";
import { TiltWrapper } from "@/components/ui/tilt-wrapper";

export function ExploreScene() {
  return (
    <SceneWrapper>
      <TiltWrapper>
      <div className="overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.02]">
        {/* Split layout */}
        <div className="flex flex-col sm:flex-row">
          {/* Left — cover image */}
          <motion.div
            className="relative flex h-40 items-center justify-center sm:h-auto sm:w-[45%]"
            style={{
              background:
                "linear-gradient(135deg, rgba(245,158,11,0.25) 0%, rgba(217,119,6,0.15) 50%, rgba(180,83,9,0.2) 100%)",
            }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease, delay: 0.2 }}
          >
            <span className="text-5xl font-black tracking-tight text-amber-500/15 sm:text-6xl">
              EVENT
            </span>
          </motion.div>

          {/* Right — details */}
          <div className="flex-1 p-5">
            {/* Category badge */}
            <motion.span
              className="inline-block rounded-full bg-amber-500/15 px-2.5 py-0.5 text-[10px] font-semibold text-amber-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {exploreEvent.category}
            </motion.span>

            {/* Title */}
            <motion.h4
              className="mt-2 text-lg font-bold tracking-tight text-white"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease, delay: 0.35 }}
            >
              {exploreEvent.title}
            </motion.h4>

            {/* Date/Time & Location rows */}
            <motion.div
              className="mt-3 space-y-1.5 text-xs text-white/50"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease, delay: 0.45 }}
            >
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <HiCalendarDays className="h-3.5 w-3.5 text-amber-500" />
                  {exploreEvent.date}
                </span>
                <span className="flex items-center gap-1.5">
                  <HiClock className="h-3.5 w-3.5 text-amber-500" />
                  {exploreEvent.time}
                </span>
              </div>
              <span className="flex items-center gap-1.5">
                <HiMapPin className="h-3.5 w-3.5 text-amber-500" />
                {exploreEvent.location}
              </span>
            </motion.div>

            {/* Avatar stack + attendee count */}
            <motion.div
              className="mt-4 flex items-center gap-2"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease, delay: 0.55 }}
            >
              <div className="flex -space-x-2">
                {exploreEvent.attendeeAvatars.map((initials, i) => (
                  <div
                    key={initials}
                    className={`flex h-7 w-7 items-center justify-center rounded-full border-2 border-[#1a1510] text-[9px] font-bold text-white ${exploreEvent.attendeeColors[i]}`}
                    style={{ zIndex: 5 - i }}
                  >
                    {initials}
                  </div>
                ))}
              </div>
              <span className="rounded-full border border-white/[0.08] bg-white/[0.04] px-2.5 py-1 text-[11px] font-medium text-amber-400">
                {exploreEvent.attendees}+ going
              </span>
            </motion.div>

            {/* Host info bar */}
            <motion.div
              className="mt-4 flex items-center gap-3 rounded-lg border border-white/[0.06] bg-white/[0.04] px-3 py-2"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease, delay: 0.65 }}
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-500/20">
                <HiUserGroup className="h-3.5 w-3.5 text-amber-400" />
              </div>
              <div>
                <span className="block text-xs font-medium text-white">
                  {exploreEvent.host}
                </span>
                <span className="text-[10px] text-white/40">
                  {exploreEvent.hostSub}
                </span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom action toolbar */}
        <motion.div
          className="flex items-center justify-between border-t border-white/[0.06] px-5 py-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.75 }}
        >
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 rounded-lg bg-amber-500/15 px-3 py-1.5 text-[11px] font-medium text-amber-400 transition-colors hover:bg-amber-500/25">
              <HiBookmark className="h-3.5 w-3.5" />
              Save
            </button>
            <button className="flex items-center gap-1.5 rounded-lg bg-sky-500/10 px-3 py-1.5 text-[11px] font-medium text-sky-400 transition-colors hover:bg-sky-500/20">
              <HiShare className="h-3.5 w-3.5" />
              Share
            </button>
            <button className="flex items-center gap-1.5 rounded-lg bg-emerald-500/10 px-3 py-1.5 text-[11px] font-medium text-emerald-400 transition-colors hover:bg-emerald-500/20">
              <HiCalendarDays className="h-3.5 w-3.5" />
              Calendar
            </button>
          </div>
          <motion.button
            className="rounded-lg bg-amber-500 px-4 py-1.5 text-xs font-semibold text-white shadow-lg shadow-amber-500/20 transition-colors hover:bg-amber-600"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease, delay: 0.85 }}
          >
            {exploreEvent.cta}
          </motion.button>
        </motion.div>
      </div>
      </TiltWrapper>

      {/* ── Similar Events row ── */}
      <motion.div
        className="mt-5"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease, delay: 0.9 }}
      >
        <div className="mb-3 flex items-center justify-between">
          <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-white/30">
            You might also like
          </span>
          <span className="flex items-center gap-1 text-[10px] font-medium text-amber-400/60">
            View all <HiArrowRight className="h-2.5 w-2.5" />
          </span>
        </div>

        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
          {similarEvents.map((evt, i) => (
            <TiltWrapper key={evt.title}>
              <motion.div
                className="group flex h-full items-center gap-3 rounded-lg border border-white/[0.06] bg-white/[0.03] p-2.5 transition-colors hover:border-white/[0.12] hover:bg-white/[0.05]"
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, ease, delay: 1.0 + i * 0.12 }}
              >
                <div
                  className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg"
                  style={{ background: evt.gradient }}
                >
                  <span className="text-[7px] font-black tracking-tight text-white/15">
                    EVENT
                  </span>
                </div>
                <div className="min-w-0">
                  <h5 className="truncate text-[11px] font-semibold text-white/80 transition-colors group-hover:text-white">
                    {evt.title}
                  </h5>
                  <span className="text-[10px] text-white/35">
                    {evt.date} &middot; {evt.attendees} going
                  </span>
                </div>
              </motion.div>
            </TiltWrapper>
          ))}
        </div>
      </motion.div>
    </SceneWrapper>
  );
}
