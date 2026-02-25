"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ease } from "@/components/animations/variants";

const browseLinks = [
  { label: "Jobs", href: "/hub?tab=jobs" },
  { label: "Housing", href: "/hub?tab=housing" },
  { label: "Discounts", href: "/hub?tab=discounts" },
];

const resourceLinks = [
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Community", href: "/community" },
  { label: "Forum", href: "/forum" },
];

const companyLinks = [
  { label: "Contact", href: "/contact" },
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];

const socialLinks = [
  { label: "Instagram", href: "#" },
  { label: "Twitter / X", href: "#" },
  { label: "LinkedIn", href: "#" },
];

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--ism-fg-muted)]/60">
        {title}
      </h3>
      <ul className="mt-4 space-y-3">
        {links.map((link) => (
          <li key={link.href + link.label}>
            <Link
              href={link.href}
              className="text-sm text-[var(--ism-fg-muted)] transition-colors hover:text-[var(--ism-fg)]"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[var(--ism-bg)] text-[var(--ism-fg)]">
      {/* Subtle gradient divider instead of hard border */}
      <motion.div
        className="absolute left-1/2 top-0 h-px w-full max-w-md -translate-x-1/2 bg-gradient-to-r from-transparent via-[var(--ism-accent)]/20 to-transparent"
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease }}
      />

      <div className="relative z-10 px-6 py-16 lg:px-12 lg:py-20 xl:px-16">
        {/* Top: Logo + Newsletter */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-sm">
            <Link href="/" className="inline-block">
              <span className="text-2xl font-bold tracking-tight text-[var(--ism-fg)]">
                ISM
              </span>
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-[var(--ism-fg-muted)]">
              Helping international students find jobs, housing, and discounts
              across Australia. One platform, zero hassle.
            </p>
          </div>

          <div className="max-w-sm lg:text-right">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--ism-fg-muted)]/60">
              Stay Updated
            </p>
            <form
              className="mt-3 flex gap-2"
              onSubmit={(e) => e.preventDefault()}
            >
              <Input
                type="email"
                placeholder="your@email.com"
                className="h-10"
              />
              <Button
                type="submit"
                variant="ism"
                size="default"
                className="shrink-0"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        {/* Link Columns */}
        <div className="mt-14 grid grid-cols-2 gap-8 sm:grid-cols-4">
          <FooterColumn title="Browse" links={browseLinks} />
          <FooterColumn title="Resources" links={resourceLinks} />
          <FooterColumn title="Company" links={companyLinks} />
          <FooterColumn title="Connect" links={socialLinks} />
        </div>

        {/* Gradient Divider */}
        <motion.div
          className="mt-14 h-px bg-gradient-to-r from-transparent via-[var(--ism-border)] to-transparent"
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease }}
        />

        {/* Bottom Bar */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-xs text-[var(--ism-fg-muted)]/60">
            &copy; {new Date().getFullYear()} International Students Movement.
            All rights reserved.
          </p>
          <p className="text-xs text-[var(--ism-fg-muted)]/40">
            Built for students, by students.
          </p>
        </div>
      </div>
    </footer>
  );
}
