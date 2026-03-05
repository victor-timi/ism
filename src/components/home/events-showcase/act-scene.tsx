"use client";

import { motion } from "motion/react";
import {
  HiCalendarDays,
  HiBookmark,
  HiShare,
  HiCheck,
  HiBell,
  HiSparkles,
} from "react-icons/hi2";
import { ease } from "@/components/animations/variants";
import { actActions, sharePlatforms } from "./data";
import { SceneWrapper } from "./scene-wrapper";
import { TiltWrapper } from "@/components/ui/tilt-wrapper";

const ACCENT_GRADIENTS: Record<string, string> = {
  emerald:
    "linear-gradient(90deg, rgba(16,185,129,0.6) 0%, rgba(4,120,87,0.4) 100%)",
  amber:
    "linear-gradient(90deg, rgba(245,158,11,0.6) 0%, rgba(217,119,6,0.4) 100%)",
  sky: "linear-gradient(90deg, rgba(14,165,233,0.6) 0%, rgba(2,132,199,0.4) 100%)",
};

const CARD_DELAYS = { calendar: 0.2, save: 1.0, share: 1.8 };
const TOAST_DELAYS = { calendar: 1.0, save: 1.8, share: 2.5 };

const timelineSteps = [
  { label: "Saved", color: "bg-amber-400", done: true },
  { label: "Calendar synced", color: "bg-emerald-400", done: true },
  { label: "Reminder in 10 days", color: "bg-sky-400", done: false },
  { label: "Mar 15 — Event Day", color: "bg-amber-400", done: false },
];

export function ActScene() {
  return (
    <SceneWrapper>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {actActions.map((action) => (
          <TiltWrapper key={action.id}>
          <motion.div
            className="relative flex h-full flex-col items-center gap-3 overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.03] p-6 text-center"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              ease,
              delay: CARD_DELAYS[action.id],
            }}
          >
            {/* Top accent gradient strip */}
            <div
              className="absolute left-0 right-0 top-0 h-1"
              style={{
                background: ACCENT_GRADIENTS[action.accentColor],
              }}
            />

            {/* Icon */}
            <div
              className={`flex h-14 w-14 items-center justify-center rounded-xl ${action.bgColor}`}
            >
              {action.id === "calendar" && <CalendarIcon />}
              {action.id === "save" && <BookmarkIcon />}
              {action.id === "share" && <ShareIcon />}
            </div>

            <span className={`text-sm font-semibold ${action.textColor}`}>
              {action.label}
            </span>
            <span className="text-[11px] text-white/40">
              {action.description}
            </span>

            {/* Animated toast */}
            <motion.div
              className={`flex items-center gap-1.5 rounded-full px-3 py-1 ${action.bgColor}`}
              initial={{ opacity: 0, y: 8, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.4,
                ease,
                delay: TOAST_DELAYS[action.id],
              }}
            >
              {action.id !== "share" && (
                <HiCheck className={`h-3 w-3 ${action.textColor}`} />
              )}
              <span className={`text-[10px] font-medium ${action.textColor}`}>
                {action.toast}
              </span>
            </motion.div>

            {/* Share: platform pills */}
            {action.id === "share" && (
              <div className="flex gap-1">
                {sharePlatforms.map((p, i) => (
                  <motion.span
                    key={p}
                    className="whitespace-nowrap rounded-full bg-sky-500/10 px-2 py-0.5 text-[9px] font-medium text-sky-400"
                    initial={{ opacity: 0, y: -4, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{
                      duration: 0.3,
                      delay: 2.8 + i * 0.15,
                      ease,
                    }}
                  >
                    {p}
                  </motion.span>
                ))}
              </div>
            )}
          </motion.div>
          </TiltWrapper>
        ))}
      </div>

      {/* ── Confirmation panel ── */}
      <TiltWrapper className="mt-5">
      <motion.div
        className="overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.02]"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease, delay: 2.6 }}
      >
        {/* Top glow strip */}
        <div
          className="h-0.5"
          style={{
            background:
              "linear-gradient(90deg, rgba(16,185,129,0.5) 0%, rgba(245,158,11,0.5) 50%, rgba(14,165,233,0.5) 100%)",
          }}
        />

        <div className="p-5">
          <div className="flex items-start gap-3.5">
            {/* Animated checkmark badge */}
            <motion.div
              className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-emerald-500/15"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.4, ease, delay: 2.8, type: "spring", stiffness: 200 }}
            >
              <HiCheck className="h-5 w-5 text-emerald-400" />
            </motion.div>

            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-semibold text-white">
                  You&apos;re all set!
                </h4>
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 3.0, duration: 0.3 }}
                >
                  <HiSparkles className="h-3.5 w-3.5 text-amber-400" />
                </motion.div>
              </div>
              <p className="mt-1 text-[11px] leading-relaxed text-white/40">
                Event saved to your calendar and bookmarks. We&apos;ll send
                you a reminder 24h before the event.
              </p>
            </div>
          </div>

          {/* Progress timeline */}
          <motion.div
            className="mt-4 flex items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.1, duration: 0.5 }}
          >
            {timelineSteps.map((step, i) => (
              <div key={step.label} className="flex flex-1 items-center">
                <div className="flex flex-col items-center gap-1.5">
                  <motion.div
                    className={`h-2.5 w-2.5 rounded-full ${step.done ? step.color : "border border-white/20 bg-transparent"}`}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 3.2 + i * 0.15, duration: 0.3, ease }}
                  />
                  <span className={`whitespace-nowrap text-[9px] font-medium ${step.done ? "text-white/60" : "text-white/30"}`}>
                    {step.label}
                  </span>
                </div>
                {i < timelineSteps.length - 1 && (
                  <motion.div
                    className="mx-1 h-px flex-1 origin-left bg-white/[0.08]"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 3.3 + i * 0.15, duration: 0.4 }}
                  />
                )}
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>
      </TiltWrapper>

      {/* ── Social proof ── */}
      <motion.div
        className="mt-4 flex items-center justify-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.6, duration: 0.6 }}
      >
        <HiBell className="h-3 w-3 text-amber-400/50" />
        <span className="text-[11px] text-white/25">
          Join{" "}
          <span className="font-semibold text-amber-400/60">847 students</span>{" "}
          who saved events this week
        </span>
      </motion.div>
    </SceneWrapper>
  );
}

function CalendarIcon() {
  return (
    <div className="relative">
      <motion.div
        initial={{ scale: 1 }}
        animate={{ scale: [1, 0.8, 1] }}
        transition={{ duration: 0.6, delay: 0.8, ease: "easeInOut" }}
      >
        <HiCalendarDays className="h-7 w-7 text-emerald-400" />
      </motion.div>
      <motion.div
        className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3, delay: 1.1, ease }}
      >
        <HiCheck className="h-2.5 w-2.5 text-white" />
      </motion.div>
    </div>
  );
}

function BookmarkIcon() {
  return (
    <motion.div
      initial={{ scale: 1 }}
      animate={{ scale: [1, 1.2, 1] }}
      transition={{ duration: 0.5, delay: 1.6, ease: "easeInOut" }}
    >
      <motion.div
        initial={{ color: "rgba(245,158,11,0.4)" }}
        animate={{ color: "rgba(245,158,11,1)" }}
        transition={{ duration: 0.4, delay: 1.6 }}
      >
        <HiBookmark className="h-7 w-7" />
      </motion.div>
    </motion.div>
  );
}

function ShareIcon() {
  return (
    <motion.div
      initial={{ scale: 1 }}
      animate={{ scale: [1, 0.9, 1] }}
      transition={{ duration: 0.4, delay: 2.4, ease: "easeInOut" }}
    >
      <HiShare className="h-7 w-7 text-sky-400" />
    </motion.div>
  );
}
