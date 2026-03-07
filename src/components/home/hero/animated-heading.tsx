"use client";

import { motion } from "motion/react";
import { ease } from "./variants";

export function AnimatedHeading({
  text,
  delay = 0,
  className,
  style,
  simple = false,
}: {
  text: string;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
  simple?: boolean;
}) {
  // Simple mode: fade in the whole word as one block (no per-character animation)
  if (simple) {
    return (
      <motion.span
        className={`block ${className ?? ""}`}
        style={style}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease, delay }}
        aria-label={text}
      >
        {text}
      </motion.span>
    );
  }

  return (
    <motion.span
      className={`block ${className ?? ""}`}
      style={style}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, margin: "-60px" }}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: 0.035, delayChildren: delay },
        },
      }}
      aria-label={text}
    >
      {text.split("").map((char, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden align-top"
          style={{ padding: "0.05em 0.04em", margin: "-0.05em -0.04em" }}
        >
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: "120%", opacity: 0 },
              visible: {
                y: "0%",
                opacity: 1,
                transition: { duration: 0.5, ease },
              },
            }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
