"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "motion/react";
import {
  HiBriefcase,
  HiHomeModern,
  HiTag,
  HiCalendarDays,
  HiMapPin,
  HiClock,
  HiCurrencyDollar,
  HiStar,
  HiUserGroup,
  HiArrowTrendingUp,
} from "react-icons/hi2";
import type { IconType } from "react-icons";
import { TiltWrapper } from "@/components/ui/tilt-wrapper";
import { ease } from "@/components/animations/variants";

/* ── Tab definitions ── */

interface HubTab {
  id: "jobs" | "housing" | "discounts" | "events";
  label: string;
  icon: IconType;
}

const tabs: HubTab[] = [
  { id: "jobs", label: "Jobs", icon: HiBriefcase },
  { id: "housing", label: "Housing", icon: HiHomeModern },
  { id: "discounts", label: "Discounts", icon: HiTag },
  { id: "events", label: "Events", icon: HiCalendarDays },
];

/* ── Mock data ── */

const jobCities = ["All Cities", "Sydney", "Melbourne", "Brisbane", "Perth"];
const jobTypes = ["All Types", "Part-Time", "Casual", "Internship"];
const mockJobs = [
  { title: "Barista — Campus Coffee Co", type: "Part-Time", location: "Sydney", hours: "15 hrs/wk", pay: "$28/hr", hot: true, visa: true },
  { title: "Retail Associate — Uniqlo", type: "Casual", location: "Melbourne", hours: "12 hrs/wk", pay: "$30/hr", hot: false, visa: true },
  { title: "Admin Assistant — UniMelb", type: "Part-Time", location: "Melbourne", hours: "20 hrs/wk", pay: "$32/hr", hot: true, visa: true },
];

const housingLocations = ["Carlton", "Redfern", "South Bank", "Subiaco", "Adelaide CBD"];
const mockHousing = [
  { title: "Private Room in Carlton Share House", price: "$210/wk", location: "Carlton, VIC", type: "Share House", rooms: "4 bed", transport: "5 min to UniMelb", gradient: "linear-gradient(135deg, rgba(14,165,233,0.4) 0%, rgba(2,132,199,0.2) 100%)" },
  { title: "Studio Apartment — Redfern", price: "$320/wk", location: "Redfern, NSW", type: "Studio", rooms: "1 bed", transport: "8 min to USYD", gradient: "linear-gradient(135deg, rgba(16,185,129,0.4) 0%, rgba(4,120,87,0.2) 100%)" },
  { title: "Flatmate Wanted — South Bank", price: "$185/wk", location: "South Bank, QLD", type: "Shared Room", rooms: "3 bed", transport: "10 min to UQ", gradient: "linear-gradient(135deg, rgba(168,85,247,0.4) 0%, rgba(139,92,246,0.2) 100%)" },
];

const discountCategories = ["All", "Food", "Tech", "Transport", "Entertainment"];
const mockDiscounts = [
  { brand: "Spotify", deal: "50% off Premium", category: "Entertainment", save: "$7/mo", verified: true, gradient: "linear-gradient(135deg, rgba(30,215,96,0.4) 0%, rgba(30,215,96,0.15) 100%)" },
  { brand: "Uber Eats", deal: "30% off first 5 orders", category: "Food", save: "$45", verified: true, gradient: "linear-gradient(135deg, rgba(245,158,11,0.4) 0%, rgba(217,119,6,0.15) 100%)" },
  { brand: "Apple", deal: "Education pricing on MacBook", category: "Tech", save: "$300+", verified: true, gradient: "linear-gradient(135deg, rgba(99,102,241,0.4) 0%, rgba(79,70,229,0.15) 100%)" },
  { brand: "Opal Card", deal: "Weekly travel cap $50", category: "Transport", save: "$20/wk", verified: true, gradient: "linear-gradient(135deg, rgba(14,165,233,0.4) 0%, rgba(2,132,199,0.15) 100%)" },
];

const eventCities = ["Sydney", "Melbourne", "Brisbane", "Perth"];
const eventCategories = ["Social", "Career", "Cultural", "Sports"];
const mockEvents = [
  { title: "International Welcome Night", date: "Mar 15", location: "Sydney", category: "Social", attendees: 234, gradient: "linear-gradient(135deg, rgba(245,158,11,0.4) 0%, rgba(180,83,9,0.3) 100%)", featured: true },
  { title: "Tech Career Fair 2026", date: "Mar 22", location: "Melbourne", category: "Career", attendees: 156, gradient: "linear-gradient(135deg, rgba(99,102,241,0.4) 0%, rgba(67,56,202,0.3) 100%)", featured: false },
  { title: "Cultural Festival & Food Market", date: "Mar 29", location: "Brisbane", category: "Cultural", attendees: 89, gradient: "linear-gradient(135deg, rgba(236,72,153,0.4) 0%, rgba(190,24,93,0.3) 100%)", featured: false },
];

/* ── Scene wrapper ── */

function SceneWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
      transition={{ duration: 0.6, ease }}
    >
      {children}
    </motion.div>
  );
}

/* ── Filter pills helper ── */

function FilterPills({ label, items, activeIndex = 0, delay = 0 }: { label: string; items: string[]; activeIndex?: number; delay?: number }) {
  return (
    <div>
      <span className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.15em] text-white/40">
        {label}
      </span>
      <div className="flex flex-wrap gap-1.5">
        {items.map((item, i) => (
          <motion.span
            key={item}
            initial={{ opacity: 0, scale: 0.8, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.4, ease, delay: delay + i * 0.05 }}
            className={`rounded-full px-3 py-1.5 text-xs font-medium ${
              i === activeIndex
                ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20"
                : "border border-white/[0.08] text-white/40"
            }`}
          >
            {item}
          </motion.span>
        ))}
      </div>
    </div>
  );
}

/* ── Jobs Scene ── */

function JobsScene() {
  return (
    <SceneWrapper>
      <div className="space-y-5">
        {/* Search bar */}
        <motion.div
          className="flex items-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-2.5"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease }}
        >
          <HiBriefcase className="h-4 w-4 text-emerald-500/60" />
          <span className="text-xs text-white/30">Search jobs, companies, or keywords...</span>
        </motion.div>

        <FilterPills label="City" items={jobCities} activeIndex={1} delay={0.15} />
        <FilterPills label="Job Type" items={jobTypes} activeIndex={1} delay={0.3} />

        {/* Job cards */}
        <div className="space-y-2.5">
          {mockJobs.map((job, i) => (
            <TiltWrapper key={job.title}>
              <motion.div
                className="relative overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.03] p-4"
                initial={{ opacity: 0, y: 24, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, ease, delay: 0.45 + i * 0.12 }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-semibold text-white">{job.title}</h4>
                      {job.hot && (
                        <span className="rounded-full bg-amber-500/15 px-2 py-0.5 text-[10px] font-bold text-amber-400">Hot</span>
                      )}
                    </div>
                    <div className="mt-1.5 flex items-center gap-3 text-[11px] text-white/40">
                      <span className="flex items-center gap-1"><HiMapPin className="h-3 w-3" />{job.location}</span>
                      <span className="flex items-center gap-1"><HiClock className="h-3 w-3" />{job.hours}</span>
                      <span className="flex items-center gap-1"><HiCurrencyDollar className="h-3 w-3" />{job.pay}</span>
                    </div>
                  </div>
                  {job.visa && (
                    <span className="shrink-0 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-400">
                      Visa OK
                    </span>
                  )}
                </div>
              </motion.div>
            </TiltWrapper>
          ))}
        </div>
      </div>
    </SceneWrapper>
  );
}

/* ── Housing Scene ── */

function HousingScene() {
  return (
    <SceneWrapper>
      <div className="space-y-5">
        <FilterPills label="Suburb" items={housingLocations} activeIndex={0} />

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {mockHousing.map((h, i) => (
            <TiltWrapper key={h.title}>
              <motion.div
                className="relative h-full overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.03]"
                initial={{ opacity: 0, y: 24, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, ease, delay: 0.3 + i * 0.12 }}
              >
                <div className="h-24" style={{ background: h.gradient }}>
                  <div className="flex h-full items-center justify-center">
                    <HiHomeModern className="h-8 w-8 text-white/15" />
                  </div>
                </div>
                <div className="p-3.5">
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-white/[0.06] px-2 py-0.5 text-[10px] font-semibold text-white/60">{h.type}</span>
                    <span className="text-sm font-bold text-emerald-400">{h.price}</span>
                  </div>
                  <h4 className="mt-2 text-xs font-semibold leading-snug text-white">{h.title}</h4>
                  <div className="mt-2 flex items-center gap-2 text-[10px] text-white/40">
                    <span className="flex items-center gap-0.5"><HiMapPin className="h-2.5 w-2.5" />{h.location}</span>
                    <span>{h.rooms}</span>
                  </div>
                  <div className="mt-1.5 text-[10px] text-emerald-400/70">{h.transport}</div>
                </div>
              </motion.div>
            </TiltWrapper>
          ))}
        </div>
      </div>
    </SceneWrapper>
  );
}

/* ── Discounts Scene ── */

function DiscountsScene() {
  return (
    <SceneWrapper>
      <div className="space-y-5">
        <FilterPills label="Category" items={discountCategories} activeIndex={0} />

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {mockDiscounts.map((d, i) => (
            <TiltWrapper key={d.brand}>
              <motion.div
                className="relative h-full overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.03]"
                initial={{ opacity: 0, y: 24, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, ease, delay: 0.25 + i * 0.1 }}
              >
                <div className="h-20" style={{ background: d.gradient }}>
                  <div className="flex h-full items-center justify-center">
                    <span className="text-2xl font-black tracking-tight text-white/15">{d.brand.toUpperCase()}</span>
                  </div>
                </div>
                <div className="p-3.5">
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-white/[0.06] px-2 py-0.5 text-[10px] font-semibold text-white/60">{d.category}</span>
                    {d.verified && (
                      <span className="flex items-center gap-0.5 text-[10px] font-semibold text-emerald-400">
                        <HiStar className="h-2.5 w-2.5" />Verified
                      </span>
                    )}
                  </div>
                  <h4 className="mt-2 text-sm font-semibold text-white">{d.deal}</h4>
                  <div className="mt-1.5 flex items-center justify-between">
                    <span className="text-[11px] text-white/40">{d.brand}</span>
                    <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-bold text-emerald-400">Save {d.save}</span>
                  </div>
                </div>
              </motion.div>
            </TiltWrapper>
          ))}
        </div>
      </div>
    </SceneWrapper>
  );
}

/* ── Events Scene ── */

function EventsScene() {
  const featured = mockEvents[0];
  const compact = mockEvents.slice(1);

  return (
    <SceneWrapper>
      <div className="space-y-5">
        <FilterPills label="City" items={eventCities} activeIndex={0} />
        <FilterPills label="Category" items={eventCategories} activeIndex={0} delay={0.2} />

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-5">
          {/* Featured event */}
          <TiltWrapper className="sm:col-span-3 sm:row-span-2">
            <motion.div
              className="relative h-full overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.03]"
              initial={{ opacity: 0, y: 24, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, ease, delay: 0.4 }}
            >
              <div className="relative h-28 sm:h-36" style={{ background: featured.gradient }}>
                <span className="absolute left-3 top-3 rounded-full bg-amber-500 px-2.5 py-0.5 text-[10px] font-bold text-white shadow-lg shadow-amber-500/30">Featured</span>
                <div className="flex h-full items-center justify-center"><span className="text-4xl font-black tracking-tight text-white/10">EVENT</span></div>
                <div className="absolute bottom-3 right-3 flex items-center gap-1 rounded-full bg-black/40 px-2.5 py-1 backdrop-blur-sm">
                  <HiUserGroup className="h-3 w-3 text-white/70" />
                  <span className="text-[10px] font-semibold text-white/90">{featured.attendees} going</span>
                </div>
              </div>
              <div className="p-4">
                <span className="inline-block rounded-full bg-amber-500/15 px-2 py-0.5 text-[10px] font-semibold text-amber-400">{featured.category}</span>
                <h4 className="mt-2 text-sm font-semibold leading-snug text-white">{featured.title}</h4>
                <div className="mt-2 flex items-center gap-3 text-[11px] text-white/50">
                  <span className="flex items-center gap-1"><HiClock className="h-3 w-3 text-amber-500/70" />{featured.date}</span>
                  <span className="flex items-center gap-1"><HiMapPin className="h-3 w-3 text-amber-500/70" />{featured.location}</span>
                </div>
              </div>
            </motion.div>
          </TiltWrapper>

          {/* Compact events */}
          {compact.map((evt, i) => (
            <TiltWrapper key={evt.title} className="sm:col-span-2">
              <motion.div
                className="relative h-full overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.03]"
                initial={{ opacity: 0, y: 24, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, ease, delay: 0.55 + i * 0.12 }}
              >
                <div className="h-16 sm:h-20" style={{ background: evt.gradient }}>
                  <div className="flex h-full items-center justify-center"><span className="text-lg font-black tracking-tight text-white/10">EVENT</span></div>
                </div>
                <div className="p-3">
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-white/[0.06] px-2 py-0.5 text-[10px] font-semibold text-white/60">{evt.category}</span>
                    <span className="flex items-center gap-1 text-[10px] text-white/40"><HiUserGroup className="h-2.5 w-2.5" />{evt.attendees}</span>
                  </div>
                  <h4 className="mt-1.5 text-xs font-semibold leading-snug text-white/90">{evt.title}</h4>
                  <div className="mt-1.5 flex items-center gap-2 text-[10px] text-white/40">
                    <span className="flex items-center gap-0.5"><HiClock className="h-2.5 w-2.5" />{evt.date}</span>
                    <span className="flex items-center gap-0.5"><HiMapPin className="h-2.5 w-2.5" />{evt.location}</span>
                  </div>
                </div>
              </motion.div>
            </TiltWrapper>
          ))}
        </div>
      </div>
    </SceneWrapper>
  );
}

/* ── Main showcase ── */

const CYCLE_MS = 5000;
const PAUSE_AFTER_CLICK_MS = 10000;

export function HubShowcase() {
  const [activeTab, setActiveTab] = useState<HubTab["id"]>("jobs");
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const pauseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const windowRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: windowRef,
    offset: ["start end", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const parallaxRotateX = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [3, 0, 0, -2]);
  const parallaxScale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.97, 1, 1, 0.98]);

  const cycleNext = useCallback(() => {
    setActiveTab((prev) => {
      const idx = tabs.findIndex((t) => t.id === prev);
      return tabs[(idx + 1) % tabs.length].id;
    });
    setProgress(0);
  }, []);

  useEffect(() => {
    if (isPaused) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }
    const tickMs = 50;
    intervalRef.current = setInterval(() => {
      setProgress((prev) => {
        const next = prev + tickMs / CYCLE_MS;
        if (next >= 1) { cycleNext(); return 0; }
        return next;
      });
    }, tickMs);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [isPaused, cycleNext]);

  const handleTabClick = (id: HubTab["id"]) => {
    if (id === activeTab) return;
    setActiveTab(id);
    setProgress(0);
    setIsPaused(true);
    if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    pauseTimeoutRef.current = setTimeout(() => setIsPaused(false), PAUSE_AFTER_CLICK_MS);
  };

  useEffect(() => {
    return () => { if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current); };
  }, []);

  return (
    <div className="mt-12 lg:mt-16" style={{ perspective: 1200 }}>
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
        {/* Floating badge — top right */}
        <motion.div
          className="absolute -right-2 -top-4 z-30 hidden rounded-xl border border-white/[0.1] px-3.5 py-2 shadow-lg sm:block md:-right-6 md:-top-6"
          style={{
            background: "linear-gradient(135deg, rgba(4,120,87,0.9) 0%, rgba(4,120,87,0.75) 100%)",
            boxShadow: "0 8px 32px -4px rgba(4,120,87,0.4)",
          }}
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.8 }}
        >
          <span className="text-xs font-semibold text-white">
            Updated every morning
          </span>
        </motion.div>

        {/* Floating badge — top left */}
        <motion.div
          className="absolute -left-2 -top-3 z-30 hidden items-center gap-2 rounded-full border border-white/[0.1] px-3 py-1.5 sm:flex md:-left-4 md:-top-5"
          style={{
            background: "rgba(15,23,20,0.9)",
            backdropFilter: "blur(8px)",
            boxShadow: "0 4px 16px -2px rgba(0,0,0,0.3)",
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.9 }}
        >
          <div className="relative">
            <div className="h-2 w-2 rounded-full bg-emerald-400" />
            <div className="absolute inset-0 animate-ping rounded-full bg-emerald-400 opacity-40" />
          </div>
          <span className="text-[11px] font-medium text-emerald-400">
            <HiArrowTrendingUp className="mr-0.5 inline h-3 w-3" />
            3,200+ active listings
          </span>
        </motion.div>

        {/* Dark window chrome */}
        <div
          className="relative overflow-hidden rounded-2xl"
          style={{
            background: "linear-gradient(180deg, #111a15 0%, #0d140f 100%)",
            boxShadow: "0 24px 80px -12px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.06) inset, 0 1px 0 rgba(255,255,255,0.08) inset",
          }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => {
            if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
            setIsPaused(false);
          }}
        >
          {/* Window header bar */}
          <div className="flex items-center gap-2 border-b border-white/[0.06] px-4 py-3 sm:px-5">
            <div className="flex gap-1.5">
              <div className="h-3 w-3 rounded-full bg-[#ff5f57]" />
              <div className="h-3 w-3 rounded-full bg-[#febc2e]" />
              <div className="h-3 w-3 rounded-full bg-[#28c840]" />
            </div>

            <div className="ml-3 flex items-center gap-2">
              <div className="relative">
                <div className="h-2 w-2 rounded-full bg-emerald-400" />
                <div className="absolute inset-0 animate-ping rounded-full bg-emerald-400 opacity-40" />
              </div>
              <span className="text-xs font-semibold text-white/70">ISM Hub</span>
            </div>

            {/* Tab pills */}
            <div className="ml-auto flex items-center gap-0.5 sm:gap-1">
              {tabs.map((tab) => {
                const isActive = tab.id === activeTab;
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => handleTabClick(tab.id)}
                    className={`relative flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-[11px] font-medium transition-all duration-300 sm:px-2.5 ${
                      isActive
                        ? "bg-white/[0.08] text-emerald-400"
                        : "text-white/30 hover:text-white/50"
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">{tab.label}</span>
                    {isActive && (
                      <motion.div
                        className="absolute bottom-0 left-1.5 right-1.5 h-[2px] overflow-hidden rounded-full bg-emerald-400/20"
                        layoutId="hub-tab-track"
                      >
                        <motion.div
                          className="h-full bg-emerald-400"
                          style={{ width: `${progress * 100}%` }}
                        />
                      </motion.div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Scene content */}
          <div className="relative h-[520px] overflow-y-auto p-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:p-8">
            <AnimatePresence mode="wait">
              {activeTab === "jobs" && <JobsScene key="jobs" />}
              {activeTab === "housing" && <HousingScene key="housing" />}
              {activeTab === "discounts" && <DiscountsScene key="discounts" />}
              {activeTab === "events" && <EventsScene key="events" />}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
