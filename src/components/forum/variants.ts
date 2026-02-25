import type { Variants } from "motion/react";

export const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

export const messageReveal: Variants = {
  hidden: { opacity: 0, x: -20, filter: "blur(4px)" },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease, delay: 0.1 + i * 0.1 },
  }),
};

export const newMessageAnim: Variants = {
  hidden: { opacity: 0, y: 16, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease },
  },
};
