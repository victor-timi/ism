"use client";

import { motion, type Variants } from "motion/react";

const containerVariants: Variants = {
  hidden: {},
  visible: (delay: number) => ({
    transition: {
      staggerChildren: 0.08,
      delayChildren: delay,
    },
  }),
};

const wordVariants: Variants = {
  hidden: {
    y: "100%",
    opacity: 0,
  },
  visible: {
    y: "0%",
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

interface SplitTextProps {
  children: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
}

export function SplitText({
  children,
  className,
  delay = 0,
  as: Tag = "div",
}: SplitTextProps) {
  const words = children.split(" ");

  return (
    <Tag aria-label={children}>
      <motion.span
        className={className}
        style={{ display: "block" }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        custom={delay}
      >
        {words.map((word, i) => (
          <span key={i} className="inline-block overflow-hidden">
            <motion.span className="inline-block" variants={wordVariants}>
              {word}
            </motion.span>
            {i < words.length - 1 && "\u00A0"}
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
