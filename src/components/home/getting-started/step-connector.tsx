"use client";

import { motion } from "motion/react";
import { ease } from "@/components/home/value-proposition/variants";

export function StepConnectorLine() {
  return (
    <>
      {/* Desktop: single horizontal line behind all cards at icon center height */}
      <motion.div
        className="pointer-events-none absolute left-[10%] right-[10%] top-[116px] z-0 hidden h-px lg:block"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, var(--ism-accent) 20%, var(--ism-accent) 80%, transparent 100%)",
          opacity: 0.15,
        }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: false, margin: "-40px" }}
        transition={{ duration: 1.2, ease, delay: 0.3 }}
      />
    </>
  );
}
