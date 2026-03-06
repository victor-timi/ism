"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { PageHero } from "@/components/layout/page-hero";
import { Button } from "@/components/ui/button";
import { BlogCard } from "@/components/blog/blog-card";
import { mockPosts } from "@/components/blog/mock-posts";
import {
  ease,
  labelReveal,
  bodyFade,
} from "@/components/animations/variants";
import { RevealHeading } from "@/components/home/value-proposition/reveal-heading";
import { ROUTES } from "@/lib/routes";

export default function BlogPage() {
  const featured = mockPosts.find((p) => p.featured);
  const rest = mockPosts.filter((p) => !p.featured);

  return (
    <>
      <PageHero
        align="left"
        headingClass="text-h1"
        label="Blog"
        title="Guides, tips & student news."
        description="Everything you need to thrive as an international student in Australia."
      />

      <section className="bg-[var(--ism-bg)] px-6 py-16 lg:px-12 lg:py-24 xl:px-16">
        <div>
          {/* Featured post */}
          {featured && <BlogCard post={featured} index={0} featured />}

          {/* Post grid */}
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((post, i) => (
              <BlogCard key={post.id} post={post} index={i + 1} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[var(--ism-bg)] px-6 py-24 lg:px-12 lg:py-36 xl:px-16">
        <div className="mx-auto max-w-2xl text-center">
          <motion.p
            className="text-sm font-semibold uppercase tracking-[0.25em] text-[var(--ism-accent)]"
            variants={labelReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            Contribute
          </motion.p>
          <RevealHeading
            text="Want to write for us?"
            className="text-h2 mt-4 text-[var(--ism-fg)]"
          />
          <motion.p
            className="text-body-lg mt-5 text-[var(--ism-fg-muted)]"
            variants={bodyFade}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            Share your experience, tips, and stories with the student community.
            We&apos;re always looking for new voices.
          </motion.p>
          <motion.div
            className="mt-8"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease, delay: 0.6 }}
          >
            <Button variant="ism" size="lg" asChild>
              <Link href={ROUTES.contact}>Get in Touch</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  );
}
