"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { labelReveal } from "@/components/animations/variants";
import { RevealHeading } from "@/components/home/value-proposition/reveal-heading";
import { navItems } from "./data";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const firstName = "there";

  return (
    <div className="bg-[var(--ism-bg)]">
      {/* Account Header */}
      <section className="ism-grain relative overflow-hidden px-6 pt-28 pb-8 lg:px-12 lg:pt-36 lg:pb-10 xl:px-16">
        <div className="pointer-events-none absolute inset-0 z-0">
          <div
            className="absolute left-1/2 top-[30%] h-[400px] w-[400px] -translate-x-1/2 rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(4,120,87,0.06) 0%, transparent 65%)",
              filter: "blur(80px)",
            }}
          />
        </div>

        <div className="relative z-10 mx-auto max-w-5xl">
          <motion.p
            className="text-sm font-semibold uppercase tracking-[0.25em] text-[var(--ism-accent)]"
            variants={labelReveal}
            initial="hidden"
            animate="visible"
          >
            Welcome back, {firstName}
          </motion.p>
          <RevealHeading
            text="Your account."
            className="text-h2 mt-2 text-[var(--ism-fg)]"
          />
        </div>
      </section>

      {/* Nav pills */}
      <div className="border-b border-[var(--ism-border)] px-6 lg:px-12 xl:px-16">
        <div className="mx-auto max-w-5xl">
          <nav className="flex gap-1 overflow-x-auto">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 whitespace-nowrap border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
                    isActive
                      ? "border-[var(--ism-accent)] text-[var(--ism-accent)]"
                      : "border-transparent text-[var(--ism-fg-muted)] hover:text-[var(--ism-fg)]"
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Page content */}
      <div className="mx-auto max-w-5xl px-6 py-10 lg:px-12 lg:py-14 xl:px-16">
        {children}
      </div>
    </div>
  );
}
