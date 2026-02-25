"use client";

import { motion } from "motion/react";
import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import { cardVariants } from "@/components/animations/variants";
import type { BlogPost } from "./mock-posts";

const categoryGradients: Record<string, string> = {
  Jobs: "from-emerald-500/20 via-emerald-400/10 to-transparent",
  Housing: "from-sky-500/20 via-cyan-400/10 to-transparent",
  Discounts: "from-violet-500/20 via-purple-400/10 to-transparent",
  "Visa Guide": "from-amber-500/20 via-orange-400/10 to-transparent",
  Finance: "from-blue-500/20 via-indigo-400/10 to-transparent",
  Career: "from-rose-500/20 via-pink-400/10 to-transparent",
};

export function BlogCard({
  post,
  index,
  featured = false,
}: {
  post: BlogPost;
  index: number;
  featured?: boolean;
}) {
  return (
    <motion.div
      variants={cardVariants}
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-30px" }}
      className={featured ? "md:col-span-full" : ""}
    >
      <GlassCard
        className={featured ? "p-8 lg:p-10" : "p-6"}
        gradient={categoryGradients[post.category] || categoryGradients.Jobs}
      >
        {/* Placeholder gradient image */}
        <div
          className={`rounded-xl ${featured ? "mb-6 h-48 lg:h-64" : "mb-4 h-36"}`}
          style={{
            background: `linear-gradient(135deg, rgba(4,120,87,0.08) 0%, rgba(99,102,241,0.06) 50%, rgba(4,120,87,0.04) 100%)`,
          }}
        />

        <Badge variant="secondary" className="mb-3">
          {post.category}
        </Badge>

        <h3
          className={`font-bold text-[var(--ism-fg)] ${
            featured ? "text-2xl lg:text-3xl" : "text-lg"
          }`}
        >
          {post.title}
        </h3>

        <p
          className={`mt-2 text-[var(--ism-fg-muted)] ${
            featured ? "text-base" : "text-sm"
          } leading-relaxed`}
        >
          {post.excerpt}
        </p>

        <div className="mt-4 flex items-center gap-3 text-xs text-[var(--ism-fg-muted)]">
          <span className="font-medium text-[var(--ism-fg)]">
            {post.author}
          </span>
          <span>·</span>
          <span>{post.date}</span>
          <span>·</span>
          <span>{post.readTime}</span>
        </div>
      </GlassCard>
    </motion.div>
  );
}
