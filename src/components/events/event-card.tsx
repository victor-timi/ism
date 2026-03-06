"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { HiMapPin, HiCalendarDays } from "react-icons/hi2";
import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import { cardVariants } from "@/components/animations/variants";
import { urlFor } from "@/lib/sanity";
import type { SanityEvent } from "@/types/event";

function formatEventDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-AU", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}

function formatEventTime(iso: string): string {
  return new Date(iso).toLocaleTimeString("en-AU", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

export function EventCard({
  event,
  index,
}: {
  event: SanityEvent;
  index: number;
}) {
  return (
    <motion.div
      variants={cardVariants}
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-30px" }}
    >
      <GlassCard
        gradient="from-amber-500/20 via-orange-400/10 to-transparent"
        tiltStrength={0}
      >
        <Link
          href={`/hub/events/${event.slug}`}
          className="flex h-full flex-col"
        >
          {/* Cover image */}
          {event.image && (
            <div className="relative h-40 w-full overflow-hidden rounded-t-2xl">
              <Image
                src={urlFor(event.image).width(600).height(320).url()}
                alt={event.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          )}

          <div className="flex flex-1 flex-col p-6">
            {/* Category + Cost */}
            <div className="flex items-center justify-between">
              <Badge
                variant="secondary"
                className="bg-amber-500/10 text-amber-600 dark:text-amber-400"
              >
                {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
              </Badge>
              {event.cost && (
                <span className="text-sm font-semibold text-[var(--ism-fg)]">
                  {event.cost}
                </span>
              )}
            </div>

            {/* Title */}
            <h3 className="mt-3 text-lg font-bold text-[var(--ism-fg)]">
              {event.title}
            </h3>

            {/* Date & Time */}
            <div className="mt-2 flex items-center gap-1.5 text-xs text-[var(--ism-fg-muted)]">
              <HiCalendarDays className="h-3.5 w-3.5 text-amber-500" />
              {formatEventDate(event.datetime)} · {formatEventTime(event.datetime)}
            </div>

            {/* Location */}
            <div className="mt-1 flex items-center gap-1.5 text-xs text-[var(--ism-fg-muted)]">
              <HiMapPin className="h-3.5 w-3.5" />
              {event.location}
            </div>

            {/* Snippet */}
            {event.snippet && (
              <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--ism-fg-muted)]">
                {event.snippet}
              </p>
            )}

            {/* Register CTA */}
            {event.registrationUrl && (
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-amber-600 dark:text-amber-400">
                Register
                <svg
                  className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-2"
                  fill="none"
                  viewBox="0 0 16 16"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    d="M3 8h10m0 0L9 4m4 4L9 12"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            )}
          </div>
        </Link>
      </GlassCard>
    </motion.div>
  );
}
