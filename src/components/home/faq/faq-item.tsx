"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const spring = { type: "spring" as const, stiffness: 200, damping: 26 };

function MarqueeContent({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const segment = (
    <span className="mx-8 inline-flex items-center gap-6 whitespace-nowrap">
      <span className="font-bold">{question}</span>
      <span className="text-[var(--ism-accent)]">/</span>
      <span className="opacity-70">{answer}</span>
    </span>
  );

  return (
    <div className="animate-marquee flex">
      {segment}
      {segment}
      {segment}
      {segment}
    </div>
  );
}

export function FaqItem({
  number,
  question,
  answer,
}: {
  number: string;
  question: string;
  answer: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      className="group relative"
      animate={{
        backgroundColor: open
          ? "rgba(255,255,255,0.03)"
          : "rgba(255,255,255,0)",
      }}
      transition={{ duration: 0.3 }}
      style={{ borderRadius: 0 }}
    >
      {/* Accent left edge when open */}
      <motion.div
        className="absolute left-0 top-3 bottom-3 w-[2px] rounded-full bg-[var(--ism-accent)]"
        initial={false}
        animate={{ opacity: open ? 1 : 0, scaleY: open ? 1 : 0.3 }}
        transition={spring}
      />

      {/* Clickable trigger row */}
      <button
        type="button"
        className="relative z-10 flex w-full cursor-pointer items-center gap-4 py-5 pl-4 pr-4 text-left md:gap-6 md:py-6 md:pl-5 md:pr-5"
        onClick={() => setOpen((o) => !o)}
      >
        {/* Number — accent color when open */}
        <motion.span
          className="shrink-0 text-sm font-semibold tabular-nums md:text-base"
          animate={{
            color: open
              ? "var(--ism-accent)"
              : "var(--ism-fg-muted)",
            opacity: open ? 1 : 0.5,
          }}
          transition={{ duration: 0.25 }}
        >
          {number}
        </motion.span>

        {/* Question */}
        <span className="flex-1 text-lg font-bold tracking-tight text-[var(--ism-fg)] md:text-xl">
          {question}
        </span>

        {/* Chevron — rotates & recolors on open */}
        <motion.div
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
          animate={{
            backgroundColor: open
              ? "rgba(16,185,129,0.12)"
              : "rgba(255,255,255,0)",
          }}
          transition={{ duration: 0.25 }}
        >
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            animate={{
              rotate: open ? 180 : 0,
              color: open
                ? "var(--ism-accent)"
                : "var(--ism-fg-muted)",
            }}
            transition={spring}
          >
            <polyline points="6 9 12 15 18 9" />
          </motion.svg>
        </motion.div>
      </button>

      {/* Marquee hover overlay — desktop only, hidden when expanded */}
      {!open && (
        <div className="pointer-events-none absolute inset-0 z-20 hidden items-center overflow-hidden bg-[var(--ism-accent)]/15 opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:flex">
          <div className="text-[var(--ism-fg)]">
            <MarqueeContent question={question} answer={answer} />
          </div>
        </div>
      )}

      {/* Solid bg to hide static text on hover — desktop only */}
      {!open && (
        <div className="pointer-events-none absolute inset-0 z-[15] hidden bg-[var(--ism-bg)] opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:block" />
      )}

      {/* Expandable answer panel */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { ...spring, stiffness: 180 },
              opacity: { duration: 0.25 },
            }}
            className="relative z-10 overflow-hidden"
          >
            {/* Glass answer container */}
            <div className="mx-4 mb-5 rounded-xl border border-white/[0.06] md:mx-5 md:mb-6"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)",
                backdropFilter: "blur(12px)",
              }}
            >
              <motion.p
                className="p-4 text-sm leading-[1.75] text-[var(--ism-fg-muted)] md:p-5 md:text-[0.95rem]"
                initial={{ y: 10, opacity: 0, filter: "blur(4px)" }}
                animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                exit={{ y: 6, opacity: 0, filter: "blur(2px)" }}
                transition={{
                  ...spring,
                  opacity: { duration: 0.3, delay: 0.08 },
                  filter: { duration: 0.3, delay: 0.08 },
                }}
              >
                {answer}
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom divider — fades when open */}
      <motion.div
        className="h-px bg-[var(--ism-fg)]"
        animate={{ opacity: open ? 0.03 : 0.08 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
}
