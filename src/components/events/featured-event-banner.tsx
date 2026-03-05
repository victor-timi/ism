"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { HiMapPin, HiCalendarDays } from "react-icons/hi2";
import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { urlFor } from "@/lib/sanity";
import type { SanityEvent } from "@/types/event";

function formatEventDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-AU", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatEventTime(iso: string): string {
  return new Date(iso).toLocaleTimeString("en-AU", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

export function FeaturedEventBanner({ event }: { event: SanityEvent }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <GlassCard gradient="from-amber-500/20 via-orange-400/10 to-transparent">
        <div className="flex flex-col md:flex-row">
          {/* Image */}
          {event.image && (
            <div className="relative h-56 w-full shrink-0 overflow-hidden rounded-t-2xl md:h-auto md:w-80 md:rounded-l-2xl md:rounded-tr-none lg:w-96">
              <Image
                src={urlFor(event.image).width(800).height(500).url()}
                alt={event.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/30" />
            </div>
          )}

          {/* Content */}
          <div className="flex flex-1 flex-col justify-center p-7 lg:p-9">
            <div className="flex items-center gap-2">
              <Badge className="bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/20">
                Featured Event
              </Badge>
              <Badge
                variant="secondary"
                className="bg-amber-500/10 text-amber-600 dark:text-amber-400"
              >
                {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
              </Badge>
            </div>

            <h3 className="mt-4 text-2xl font-bold tracking-tight text-[var(--ism-fg)] lg:text-3xl">
              {event.title}
            </h3>

            <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-[var(--ism-fg-muted)]">
              <span className="flex items-center gap-1.5">
                <HiCalendarDays className="h-4 w-4 text-amber-500" />
                {formatEventDate(event.datetime)} · {formatEventTime(event.datetime)}
              </span>
              <span className="flex items-center gap-1.5">
                <HiMapPin className="h-4 w-4" />
                {event.location}
              </span>
              {event.cost && (
                <span className="font-semibold text-[var(--ism-fg)]">
                  {event.cost}
                </span>
              )}
            </div>

            {event.snippet && (
              <p className="mt-4 text-sm leading-relaxed text-[var(--ism-fg-muted)]">
                {event.snippet}
              </p>
            )}

            <div className="mt-6 flex items-center gap-3">
              {event.registrationUrl && (
                <Button
                  asChild
                  className="bg-amber-500 text-white hover:bg-amber-600"
                >
                  <a
                    href={event.registrationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Register Now
                  </a>
                </Button>
              )}
              <Button variant="outline" asChild>
                <Link href={`/hub/events/${event.slug}`}>View Details</Link>
              </Button>
            </div>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}
