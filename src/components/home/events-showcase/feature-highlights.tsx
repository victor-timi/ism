"use client";

import { motion } from "motion/react";
import { cardVariants } from "@/components/animations/variants";
import { highlights } from "./data";
import { TiltWrapper } from "@/components/ui/tilt-wrapper";

export function FeatureHighlights() {
  return (
    <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3 lg:mt-14">
      {highlights.map((h, i) => (
        <motion.div
          key={h.value}
          custom={i}
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-40px" }}
        >
          <TiltWrapper className="h-full">
            <div
              className="group relative h-full overflow-hidden rounded-2xl"
              style={{
                background:
                  "linear-gradient(180deg, #1a1510 0%, #12100d 100%)",
                boxShadow:
                  "0 4px 24px -1px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.06) inset, 0 1px 0 rgba(255,255,255,0.08) inset",
              }}
            >
              {/* Accent gradient blob */}
              <div
                className={`pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gradient-to-br ${h.gradient} opacity-60 transition-opacity duration-700 group-hover:opacity-100`}
                style={{ filter: "blur(40px)" }}
              />

              {/* Hover border glow */}
              <div
                className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  boxShadow: `0 0 0 1px rgba(255,255,255,0.1) inset, 0 8px 48px -8px rgba(0,0,0,0.2)`,
                }}
              />

              <div className="relative flex flex-col p-5 lg:p-6">
                {/* Decorative background number */}
                <span
                  className={`pointer-events-none absolute right-4 top-2 text-6xl font-black leading-none opacity-[0.08] lg:text-7xl ${h.accentColor}`}
                >
                  {h.decorativeNumber}
                </span>

                <div className="flex items-center gap-4">
                  {/* Per-card colored icon */}
                  <div
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/[0.1]"
                    style={{
                      background: `linear-gradient(135deg, ${h.bgColor} 0%, ${h.bgColorSubtle} 100%)`,
                      backdropFilter: "blur(12px)",
                    }}
                  >
                    <h.icon className={`h-5 w-5 ${h.accentColor}`} />
                  </div>
                  <div>
                    <span className="text-lg font-bold tracking-tight text-white">
                      {h.value}
                    </span>
                    <span className="block text-[11px] font-medium text-white/50">
                      {h.sub}
                    </span>
                  </div>
                </div>

                {/* Credential pill */}
                <div className="mt-4">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] px-3 py-1 text-xs font-medium ${h.accentColor}`}
                    style={{
                      background: `linear-gradient(135deg, ${h.bgColor} 0%, ${h.bgColorSubtle} 100%)`,
                    }}
                  >
                    <span
                      className="inline-block h-1.5 w-1.5 rounded-full"
                      style={{ background: "currentColor" }}
                    />
                    {h.pill}
                  </span>
                </div>
              </div>
            </div>
          </TiltWrapper>
        </motion.div>
      ))}
    </div>
  );
}
