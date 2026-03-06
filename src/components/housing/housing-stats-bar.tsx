"use client";

import { motion } from "motion/react";
import { HiHomeModern, HiShieldCheck, HiMapPin } from "react-icons/hi2";
import { bodyFade } from "@/components/animations/variants";

const stats = [
  {
    icon: HiHomeModern,
    value: "890+",
    label: "rooms available",
  },
  {
    icon: HiShieldCheck,
    value: "Verified",
    label: "listings only",
  },
  {
    icon: HiMapPin,
    value: "Near",
    label: "campuses & transport",
  },
];

export function HousingStatsBar() {
  return (
    <motion.div
      className="border-y border-[var(--ism-border)] bg-[var(--ism-bg)] px-6 py-5 lg:px-12 xl:px-16"
      variants={bodyFade}
      initial="hidden"
      animate="visible"
    >
      <div className="flex flex-col items-center justify-center gap-6 sm:flex-row sm:gap-12 lg:gap-16">
        {stats.map((stat) => (
          <div key={stat.label} className="flex items-center gap-3">
            <stat.icon className="h-5 w-5 shrink-0 text-sky-500" />
            <div>
              <span className="text-sm font-bold text-[var(--ism-fg)]">
                {stat.value}
              </span>
              <span className="ml-1.5 text-xs text-[var(--ism-fg-muted)]">
                {stat.label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
