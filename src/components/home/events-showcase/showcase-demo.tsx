"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "motion/react";
import { steps } from "./data";
import type { Step } from "./data";
import { DiscoverScene } from "./discover-scene";
import { ExploreScene } from "./explore-scene";
import { ActScene } from "./act-scene";

const CYCLE_MS = 5000;
const PAUSE_AFTER_CLICK_MS = 10000;

export function ShowcaseDemo() {
  const [activeStep, setActiveStep] = useState<Step["id"]>("discover");
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const pauseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const windowRef = useRef<HTMLDivElement>(null);

  /* ── Scroll-driven parallax ── */
  const { scrollYProgress } = useScroll({
    target: windowRef,
    offset: ["start end", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const parallaxRotateX = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [3, 0, 0, -2]);
  const parallaxScale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.97, 1, 1, 0.98]);

  const cycleNext = useCallback(() => {
    setActiveStep((prev) => {
      const idx = steps.findIndex((s) => s.id === prev);
      return steps[(idx + 1) % steps.length].id;
    });
    setProgress(0);
  }, []);

  // Auto-cycle timer
  useEffect(() => {
    if (isPaused) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }

    const tickMs = 50;
    intervalRef.current = setInterval(() => {
      setProgress((prev) => {
        const next = prev + tickMs / CYCLE_MS;
        if (next >= 1) {
          cycleNext();
          return 0;
        }
        return next;
      });
    }, tickMs);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPaused, cycleNext]);

  const handleTabClick = (id: Step["id"]) => {
    if (id === activeStep) return;
    setActiveStep(id);
    setProgress(0);
    setIsPaused(true);

    if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    pauseTimeoutRef.current = setTimeout(
      () => setIsPaused(false),
      PAUSE_AFTER_CLICK_MS,
    );
  };

  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => {
    if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    setIsPaused(false);
  };

  // Cleanup
  useEffect(() => {
    return () => {
      if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    };
  }, []);

  return (
    <div className="mt-12 lg:mt-16" style={{ perspective: 1200 }}>
      {/* Outer wrapper with scroll parallax + floating elements */}
      <motion.div
        ref={windowRef}
        className="relative"
        style={{
          y: parallaxY,
          rotateX: parallaxRotateX,
          scale: parallaxScale,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Floating notification badge — top right */}
        <motion.div
          className="absolute -right-2 -top-4 z-30 hidden rounded-xl border border-white/[0.1] px-3.5 py-2 shadow-lg sm:block md:-right-6 md:-top-6"
          style={{
            background:
              "linear-gradient(135deg, rgba(245,158,11,0.9) 0%, rgba(217,119,6,0.85) 100%)",
            boxShadow: "0 8px 32px -4px rgba(245,158,11,0.4)",
          }}
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.8 }}
        >
          <span className="text-xs font-semibold text-white">
            12 new events this week
          </span>
        </motion.div>

        {/* Floating live stats pill — top left */}
        <motion.div
          className="absolute -left-2 -top-3 z-30 hidden items-center gap-2 rounded-full border border-white/[0.1] px-3 py-1.5 sm:flex md:-left-4 md:-top-5"
          style={{
            background: "rgba(26,21,16,0.9)",
            backdropFilter: "blur(8px)",
            boxShadow: "0 4px 16px -2px rgba(0,0,0,0.3)",
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.9 }}
        >
          <div className="relative">
            <div className="h-2 w-2 rounded-full bg-amber-400" />
            <div className="absolute inset-0 animate-ping rounded-full bg-amber-400 opacity-40" />
          </div>
          <span className="text-[11px] font-medium text-amber-400">
            847 students browsing
          </span>
        </motion.div>

        {/* Dark window chrome */}
        <div
          className="relative overflow-hidden rounded-2xl"
          style={{
            background:
              "linear-gradient(180deg, #1a1510 0%, #12100d 100%)",
            boxShadow:
              "0 24px 80px -12px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.06) inset, 0 1px 0 rgba(255,255,255,0.08) inset",
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Window header bar */}
          <div className="flex items-center gap-2 border-b border-white/[0.06] px-4 py-3 sm:px-5">
            {/* macOS dots */}
            <div className="flex gap-1.5">
              <div className="h-3 w-3 rounded-full bg-[#ff5f57]" />
              <div className="h-3 w-3 rounded-full bg-[#febc2e]" />
              <div className="h-3 w-3 rounded-full bg-[#28c840]" />
            </div>

            {/* Live indicator + title */}
            <div className="ml-3 flex items-center gap-2">
              <div className="relative">
                <div className="h-2 w-2 rounded-full bg-amber-400" />
                <div className="absolute inset-0 animate-ping rounded-full bg-amber-400 opacity-40" />
              </div>
              <span className="text-xs font-semibold text-white/70">
                ISM Events
              </span>
            </div>

            {/* Tab pills — right side */}
            <div className="ml-auto flex items-center gap-1">
              {steps.map((step) => {
                const isActive = step.id === activeStep;
                const Icon = step.icon;
                return (
                  <button
                    key={step.id}
                    onClick={() => handleTabClick(step.id)}
                    className={`relative flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[11px] font-medium transition-all duration-300 ${
                      isActive
                        ? "bg-white/[0.08] text-amber-400"
                        : "text-white/30 hover:text-white/50"
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">{step.label}</span>

                    {/* Progress bar under active tab */}
                    {isActive && (
                      <motion.div
                        className="absolute bottom-0 left-1.5 right-1.5 h-[2px] overflow-hidden rounded-full bg-amber-400/20"
                        layoutId="tab-progress-track"
                      >
                        <motion.div
                          className="h-full bg-amber-400"
                          style={{ width: `${progress * 100}%` }}
                        />
                      </motion.div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Scene content area — fixed height so Discover / Explore / Act stay consistent */}
          <div className="relative h-[560px] overflow-y-auto p-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:p-8">
            <AnimatePresence mode="wait">
              {activeStep === "discover" && (
                <DiscoverScene key="discover" />
              )}
              {activeStep === "explore" && <ExploreScene key="explore" />}
              {activeStep === "act" && <ActScene key="act" />}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
