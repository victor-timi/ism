"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import {
  HiOutlineBriefcase,
  HiOutlineHomeModern,
  HiOutlineTicket,
  HiOutlineCalendarDays,
} from "react-icons/hi2";
import { GlassCard } from "@/components/ui/glass-card";
import { RevealHeading } from "@/components/home/value-proposition/reveal-heading";
import {
  ease,
  labelReveal,
  bodyFade,
  cardVariants,
} from "@/components/animations/variants";
import { ROUTES } from "@/lib/routes";
import { HubShowcase } from "./hub-showcase";

const pillars = [
  {
    icon: HiOutlineBriefcase,
    heading: "Part-Time Jobs",
    tagline: "Visa-friendly hours, near your campus",
    description:
      "We pull listings from SEEK, Indeed, Jora and university job boards — then filter for visa-compliant hours, casual & part-time roles near campuses.",
    highlights: ["Visa-compliant", "Campus-close", "Updated daily"],
    href: ROUTES.hubJobs,
    cta: "Browse jobs",
    stat: "2,400+",
    statLabel: "active listings",
    gradient: "from-emerald-500/20 via-teal-500/10 to-transparent",
  },
  {
    icon: HiOutlineHomeModern,
    heading: "Accommodation",
    tagline: "Flatmates, rooms & share houses",
    description:
      "Aggregated from Flatmates.com.au, Gumtree, and uni housing portals. Compare prices, locations, and find housemates who get it.",
    highlights: ["Price comparison", "Near transport", "Housemate matching"],
    href: ROUTES.hubHousing,
    cta: "Browse housing",
    stat: "890+",
    statLabel: "rooms available",
    gradient: "from-sky-500/20 via-cyan-500/10 to-transparent",
  },
  {
    icon: HiOutlineTicket,
    heading: "Student Discounts",
    tagline: "Deals you actually want",
    description:
      "Tracking deals from UNiDAYS, Student Beans, OzBargain and more — food, transport, tech, entertainment — ranked by what students actually use.",
    highlights: ["Food & groceries", "Tech & software", "Transport deals"],
    href: ROUTES.hubDiscounts,
    cta: "Browse discounts",
    stat: "$320",
    statLabel: "avg. saved / month",
    gradient: "from-violet-500/20 via-purple-500/10 to-transparent",
  },
  {
    icon: HiOutlineCalendarDays,
    heading: "Events",
    tagline: "Meetups, career fairs & cultural nights",
    description:
      "We curate student events — socials, networking, workshops, and cultural nights — so you can meet people and build connections.",
    highlights: ["Meetups & socials", "Career fairs", "Cultural nights"],
    href: ROUTES.hubEvents,
    cta: "Browse events",
    stat: "50+",
    statLabel: "events this month",
    gradient: "from-amber-500/20 via-orange-400/10 to-transparent",
  },
];

export function HubContent() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const glowY = useTransform(scrollYProgress, [0, 1], ["-20%", "30%"]);
  const glowOpacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0, 0.5, 0.5, 0],
  );

  return (
    <>
      {/* Hero + Showcase */}
      <section className="relative overflow-hidden bg-[var(--ism-bg)] px-6 py-24 pt-32 lg:px-12 lg:py-36 lg:pt-40 xl:px-16">
        {/* Ambient glow */}
        <div className="pointer-events-none absolute inset-0 z-0">
          <motion.div
            className="absolute left-1/2 top-[10%] h-[600px] w-[600px] -translate-x-1/2 rounded-full lg:h-[800px] lg:w-[800px]"
            style={{
              background:
                "radial-gradient(circle, rgba(4,120,87,0.1) 0%, rgba(4,120,87,0.03) 40%, transparent 70%)",
              filter: "blur(80px)",
            }}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>

        {/* Dot grid */}
        <div
          className="pointer-events-none absolute inset-0 z-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle, var(--ism-fg) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        {/* Top divider */}
        <motion.div
          className="absolute left-1/2 top-0 h-px w-full max-w-md -translate-x-1/2 bg-gradient-to-r from-transparent via-[var(--ism-accent)]/20 to-transparent"
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 1.2, ease }}
        />

        <div className="relative z-10">
          {/* Header */}
          <div className="max-w-2xl">
            <motion.p
              className="text-sm font-semibold uppercase tracking-[0.25em] text-[var(--ism-accent)]"
              variants={labelReveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, margin: "-60px" }}
            >
              The Hub
            </motion.p>

            <RevealHeading
              text="Everything you need, one place."
              className="text-h2 mt-4 text-[var(--ism-fg)]"
            />

            <motion.p
              className="text-body-lg mt-5 max-w-xl text-[var(--ism-fg-muted)]"
              variants={bodyFade}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, margin: "-60px" }}
            >
              Jobs, housing, discounts, and events — aggregated from across
              the web and curated for international students in Australia.
            </motion.p>
          </div>

          {/* Interactive showcase */}
          <HubShowcase />
        </div>
      </section>

      {/* Pillar cards */}
      <section
        ref={sectionRef}
        className="relative overflow-hidden bg-[var(--ism-bg)] px-6 py-24 lg:px-12 lg:py-36 xl:px-16"
      >
        <motion.div
          className="pointer-events-none absolute left-1/2 top-0 z-0 h-[900px] w-[900px] -translate-x-1/2 rounded-full"
          style={{
            y: glowY,
            opacity: glowOpacity,
            background:
              "radial-gradient(circle, var(--ism-accent) 0%, transparent 70%)",
            filter: "blur(140px)",
          }}
        />

        <div className="relative z-10">
          <div className="max-w-3xl">
            <motion.p
              className="text-sm font-semibold uppercase tracking-[0.25em] text-[var(--ism-accent)]"
              variants={labelReveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, margin: "-60px" }}
            >
              Browse by Category
            </motion.p>

            <RevealHeading
              text="Settling in shouldn't be the hardest part."
              className="text-h2 mt-4 text-[var(--ism-fg)]"
            />

            <motion.p
              className="text-body-lg mt-5 max-w-2xl text-[var(--ism-fg-muted)]"
              variants={bodyFade}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, margin: "-60px" }}
            >
              Moving to Australia for uni is already a big leap. We bring
              together the stuff you actually need so you can focus on
              studying, not searching.
            </motion.p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:mt-20 lg:grid-cols-4 lg:gap-8">
            {pillars.map((pillar, i) => (
              <motion.div
                key={pillar.heading}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
              >
                <GlassCard gradient={pillar.gradient} className="cursor-pointer">
                  <Link
                    href={pillar.href}
                    className="relative flex h-full flex-col p-7 lg:p-9"
                  >
                    <div className="relative flex items-start justify-between">
                      <div
                        className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/[0.1] transition-all duration-500 group-hover:scale-110 group-hover:border-[var(--ism-accent)]/30"
                        style={{
                          background:
                            "linear-gradient(135deg, rgba(4,120,87,0.15) 0%, rgba(4,120,87,0.05) 100%)",
                          backdropFilter: "blur(12px)",
                        }}
                      >
                        <pillar.icon className="h-6 w-6 text-[var(--ism-accent)]" />
                      </div>
                      <div className="text-right">
                        <span className="text-2xl font-bold tracking-tight text-[var(--ism-fg)]">
                          {pillar.stat}
                        </span>
                        <span className="block text-[10px] font-medium uppercase tracking-wider text-[var(--ism-fg-muted)]/60">
                          {pillar.statLabel}
                        </span>
                      </div>
                    </div>

                    <p className="text-caption relative mt-6 font-medium text-[var(--ism-accent)]">
                      {pillar.tagline}
                    </p>

                    <h3 className="relative mt-2 text-xl font-semibold tracking-tight text-[var(--ism-fg)] lg:text-2xl">
                      {pillar.heading}
                    </h3>

                    <div className="relative mt-5 h-px w-12 bg-[var(--ism-accent)]/20 transition-all duration-700 group-hover:w-full group-hover:bg-[var(--ism-accent)]/40" />

                    <p className="relative mt-5 flex-1 text-sm leading-relaxed text-[var(--ism-fg-muted)]">
                      {pillar.description}
                    </p>

                    <div className="relative mt-5 flex flex-wrap gap-2">
                      {pillar.highlights.map((h) => (
                        <span
                          key={h}
                          className="rounded-full border border-white/[0.08] px-3 py-1 text-xs font-medium text-[var(--ism-accent)] transition-all duration-300 group-hover:border-[var(--ism-accent)]/20"
                          style={{
                            background:
                              "linear-gradient(135deg, rgba(4,120,87,0.1) 0%, rgba(4,120,87,0.04) 100%)",
                            backdropFilter: "blur(8px)",
                          }}
                        >
                          {h}
                        </span>
                      ))}
                    </div>

                    <span className="relative mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--ism-accent)]">
                      {pillar.cta}
                      <svg
                        className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-2"
                        fill="none"
                        viewBox="0 0 16 16"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          d="M3 8h10m0 0L9 4m4 4L9 12"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </Link>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
