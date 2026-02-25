"use client";

import { motion } from "motion/react";
import { wordStagger, wordReveal } from "./variants";

export function RevealHeading({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  return (
    <motion.h2
      className={className}
      variants={wordStagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, margin: "-60px" }}
    >
      {text.split(" ").map((word, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.15em] align-top">
          <motion.span
            className="inline-block"
            variants={wordReveal}
            style={{ paddingRight: "0.3em" }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.h2>
  );
}
