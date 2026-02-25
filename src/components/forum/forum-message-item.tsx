"use client";

import { motion } from "motion/react";
import type { ForumMessage } from "./types";
import { messageReveal } from "./variants";

export function ForumMessageItem({
  msg,
  index,
  animated = true,
}: {
  msg: ForumMessage;
  index: number;
  animated?: boolean;
}) {
  const content = (
    <div className="flex gap-3 px-5 py-4 transition-colors duration-300 hover:bg-white/[0.02]">
      <div
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold ${msg.color}`}
      >
        {msg.avatar}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-white/90">
            {msg.name}
          </span>
          <span className="rounded-full bg-white/[0.06] px-2 py-0.5 text-[10px] font-medium text-white/35">
            {msg.tag}
          </span>
        </div>
        <p className="mt-1 text-[13px] leading-relaxed text-white/55">
          {msg.message}
        </p>
        {msg.reactions.length > 0 && (
          <div className="mt-2 flex gap-1.5">
            {msg.reactions.map((r) => (
              <span
                key={r}
                className="inline-flex items-center gap-1 rounded-full border border-white/[0.06] bg-white/[0.04] px-2.5 py-0.5 text-xs text-white/50 transition-all duration-200 hover:border-emerald-500/20 hover:bg-emerald-500/[0.08]"
              >
                {r}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  if (!animated) return content;

  return (
    <motion.div
      custom={index}
      variants={messageReveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, margin: "-20px" }}
    >
      {content}
    </motion.div>
  );
}
