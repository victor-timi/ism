"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { PortableText } from "@portabletext/react";
import {
  HiArrowLeft,
  HiMapPin,
  HiCalendarDays,
  HiBookmark,
  HiTag,
  HiCurrencyDollar,
} from "react-icons/hi2";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EventCard } from "@/components/events/event-card";
import { ShareButtons } from "@/components/events/share-buttons";
import { urlFor } from "@/lib/sanity";
import {
  generateGoogleCalendarUrl,
  downloadICalFile,
} from "@/lib/calendar";
import { useBookmarkEvent } from "./use-bookmark-event";
import type { SanityEvent } from "@/types/event";

const ease = [0.22, 1, 0.36, 1] as const;

function formatFullDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-AU", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString("en-AU", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

export function EventDetailContent({
  event,
  relatedEvents,
}: {
  event: SanityEvent;
  relatedEvents: SanityEvent[];
}) {
  const { isSaved, toggle, loading } = useBookmarkEvent(event._id);

  const calendarUrl = generateGoogleCalendarUrl({
    title: event.title,
    description: event.snippet,
    location: event.address || event.location,
    startDate: event.datetime,
    endDate: event.endDatetime,
  });

  const handleDownloadIcal = () => {
    downloadICalFile({
      title: event.title,
      description: event.snippet,
      location: event.address || event.location,
      startDate: event.datetime,
      endDate: event.endDatetime,
    });
  };

  const pageUrl = typeof window !== "undefined" ? window.location.href : "";

  return (
    <>
      {/* Hero */}
      <section className="ism-grain relative overflow-hidden bg-[var(--ism-bg)]">
        {/* Cover Image */}
        {event.image && (
          <div className="relative h-64 w-full sm:h-80 lg:h-96">
            <Image
              src={urlFor(event.image).width(1600).height(600).url()}
              alt={event.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--ism-bg)] via-[var(--ism-bg)]/60 to-transparent" />
          </div>
        )}

        <div
          className={`relative z-10 px-6 lg:px-12 xl:px-16 ${event.image ? "-mt-24" : "pt-28 lg:pt-36"} pb-8`}
        >
          {/* Back link */}
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease }}
          >
            <Link
              href="/hub/events"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--ism-fg-muted)] transition-colors hover:text-amber-500"
            >
              <HiArrowLeft className="h-4 w-4" />
              Back to Events
            </Link>
          </motion.div>

          {/* Title */}
          <motion.h1
            className="mt-4 text-3xl font-bold tracking-tight text-[var(--ism-fg)] lg:text-4xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.1 }}
          >
            {event.title}
          </motion.h1>

          {/* Meta bar */}
          <motion.div
            className="mt-4 flex flex-wrap items-center gap-3 text-sm text-[var(--ism-fg-muted)]"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.2 }}
          >
            <span className="flex items-center gap-1.5">
              <HiCalendarDays className="h-4 w-4 text-amber-500" />
              {formatFullDate(event.datetime)} · {formatTime(event.datetime)}
              {event.endDatetime && ` – ${formatTime(event.endDatetime)}`}
            </span>
            <span className="flex items-center gap-1.5">
              <HiMapPin className="h-4 w-4" />
              {event.location}
              {event.address && `, ${event.address}`}
            </span>
            <span className="flex items-center gap-1.5">
              <HiTag className="h-4 w-4" />
              <Badge
                variant="secondary"
                className="bg-amber-500/10 text-amber-600 dark:text-amber-400"
              >
                {event.category.charAt(0).toUpperCase() +
                  event.category.slice(1)}
              </Badge>
            </span>
            {event.cost && (
              <span className="flex items-center gap-1.5 font-semibold text-[var(--ism-fg)]">
                <HiCurrencyDollar className="h-4 w-4" />
                {event.cost}
              </span>
            )}
          </motion.div>

          {/* Host info */}
          {event.hostName && (
            <motion.div
              className="mt-4 flex items-center gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {event.hostLogo && (
                <Image
                  src={urlFor(event.hostLogo).width(40).height(40).url()}
                  alt={event.hostName}
                  width={32}
                  height={32}
                  className="rounded-full"
                />
              )}
              <div className="text-sm">
                <span className="text-[var(--ism-fg-muted)]">Hosted by </span>
                {event.hostUrl ? (
                  <a
                    href={event.hostUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-[var(--ism-fg)] hover:text-amber-500"
                  >
                    {event.hostName}
                  </a>
                ) : (
                  <span className="font-medium text-[var(--ism-fg)]">
                    {event.hostName}
                  </span>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Action Row + Body */}
      <section className="bg-[var(--ism-bg)] px-6 pb-16 lg:px-12 xl:px-16">
        <div>
          {/* Action row */}
          <motion.div
            className="flex flex-wrap items-center gap-3 border-y border-[var(--ism-border)] py-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
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
                  Register
                </a>
              </Button>
            )}

            {/* Google Calendar */}
            <Button variant="outline" size="sm" asChild>
              <a href={calendarUrl} target="_blank" rel="noopener noreferrer">
                <HiCalendarDays className="mr-1.5 h-4 w-4" />
                Google Calendar
              </a>
            </Button>

            {/* iCal download */}
            <Button variant="outline" size="sm" onClick={handleDownloadIcal}>
              <HiCalendarDays className="mr-1.5 h-4 w-4" />
              Download .ics
            </Button>

            {/* Bookmark */}
            <Button
              variant="outline"
              size="sm"
              onClick={toggle}
              disabled={loading}
              className={isSaved ? "text-amber-500 border-amber-500/30" : ""}
            >
              <HiBookmark className="mr-1.5 h-4 w-4" />
              {isSaved ? "Saved" : "Save"}
            </Button>
          </motion.div>

          {/* Share */}
          <div className="mt-4">
            <ShareButtons url={pageUrl} title={event.title} />
          </div>

          {/* Description */}
          {event.description && (
            <motion.div
              className="prose prose-invert mt-8 max-w-none prose-headings:text-[var(--ism-fg)] prose-p:text-[var(--ism-fg-muted)] prose-a:text-amber-500 prose-strong:text-[var(--ism-fg)]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease, delay: 0.4 }}
            >
              <PortableText value={event.description} />
            </motion.div>
          )}

          {/* Related Events */}
          {relatedEvents.length > 0 && (
            <div className="mt-16">
              <h2 className="text-xl font-bold text-[var(--ism-fg)]">
                More Events
              </h2>
              <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {relatedEvents.map((e, i) => (
                  <EventCard key={e._id} event={e} index={i} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
