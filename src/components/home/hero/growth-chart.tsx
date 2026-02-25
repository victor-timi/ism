"use client";

import { motion } from "motion/react";

export function GrowthChart() {
  const line =
    "M 0 130 C 50 128 80 124 100 122 C 130 119 170 117 200 115 C 240 112 280 110 300 108 C 340 104 380 100 400 98 C 440 102 480 108 500 110 C 540 108 580 106 600 105 C 650 98 700 90 700 85 C 740 75 780 68 800 62 C 840 52 880 44 900 38 C 940 28 970 20 1000 15";
  const area = line + " L 1000 150 L 0 150 Z";

  return (
    <svg
      viewBox="0 0 1000 150"
      className="h-28 w-full lg:h-40"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="chart-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--ism-accent)" stopOpacity={0.15} />
          <stop offset="100%" stopColor="var(--ism-accent)" stopOpacity={0.02} />
        </linearGradient>
        <linearGradient id="chart-stroke" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--ism-accent)" stopOpacity={0.3} />
          <stop offset="100%" stopColor="var(--ism-accent)" stopOpacity={1} />
        </linearGradient>
      </defs>
      <motion.path
        d={area}
        fill="url(#chart-fill)"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false }}
        transition={{ duration: 0.8 }}
      />
      <motion.path
        d={line}
        fill="none"
        stroke="url(#chart-stroke)"
        strokeWidth={2.5}
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: false }}
        transition={{ duration: 2, ease: "easeInOut" }}
      />
    </svg>
  );
}
