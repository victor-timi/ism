"use client";

import { Suspense, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "motion/react";
import { EventCard } from "@/components/events/event-card";
import { EventFilterBar } from "@/components/events/event-filter-bar";
import { FeaturedEventBanner } from "@/components/events/featured-event-banner";
import { ease, labelReveal, bodyFade } from "@/components/animations/variants";
import { RevealHeading } from "@/components/home/value-proposition/reveal-heading";
import type { SanityEvent } from "@/types/event";

function isWithinDateRange(datetime: string, range: string): boolean {
  const eventDate = new Date(datetime);
  const now = new Date();

  if (range === "week") {
    const endOfWeek = new Date(now);
    endOfWeek.setDate(now.getDate() + (7 - now.getDay()));
    endOfWeek.setHours(23, 59, 59, 999);
    return eventDate <= endOfWeek;
  }

  if (range === "month") {
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);
    return eventDate <= endOfMonth;
  }

  return true; // "all"
}

function EventsInner({
  events,
  featuredEvent,
}: {
  events: SanityEvent[];
  featuredEvent: SanityEvent | null;
}) {
  const searchParams = useSearchParams();

  const city = searchParams.get("city") || "all";
  const category = searchParams.get("category") || "all";
  const dateRange = searchParams.get("date") || "all";

  const filteredEvents = useMemo(() => {
    return events.filter((e) => {
      if (city !== "all" && e.city !== city) return false;
      if (category !== "all" && e.category !== category) return false;
      if (!isWithinDateRange(e.datetime, dateRange)) return false;
      return true;
    });
  }, [events, city, category, dateRange]);

  return (
    <>
      {/* Compact Hero */}
      <section className="ism-grain relative overflow-hidden bg-[var(--ism-bg)] px-6 pt-28 pb-12 lg:px-12 lg:pt-36 lg:pb-16 xl:px-16">
        <div className="pointer-events-none absolute inset-0 z-0">
          <div
            className="absolute left-1/2 top-[30%] h-[500px] w-[500px] -translate-x-1/2 rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(245,158,11,0.08) 0%, transparent 65%)",
              filter: "blur(80px)",
            }}
          />
        </div>

        <div className="relative z-10">
          <motion.p
            className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-500"
            variants={labelReveal}
            initial="hidden"
            animate="visible"
          >
            Events
          </motion.p>
          <RevealHeading
            text="What's happening near you."
            className="text-h2 mt-3 text-[var(--ism-fg)]"
          />
          <motion.p
            className="text-body-lg mt-3 max-w-xl text-[var(--ism-fg-muted)]"
            variants={bodyFade}
            initial="hidden"
            animate="visible"
          >
            Student meetups, career fairs, cultural nights, and more — find
            events for international students across Australia.
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <section className="bg-[var(--ism-bg)] px-6 py-8 lg:px-12 lg:py-12 xl:px-16">
        <div>
          <EventFilterBar />

          {/* Featured event */}
          {featuredEvent && (
            <div className="mt-8">
              <FeaturedEventBanner event={featuredEvent} />
            </div>
          )}

          {/* Event grid */}
          {filteredEvents.length > 0 ? (
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredEvents.map((event, i) => (
                <EventCard key={event._id} event={event} index={i} />
              ))}
            </div>
          ) : (
            <motion.div
              className="mt-16 flex flex-col items-center gap-3 py-12 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, ease }}
            >
              <p className="text-lg font-semibold text-[var(--ism-fg)]">
                No events found
              </p>
              <p className="text-sm text-[var(--ism-fg-muted)]">
                Try adjusting your filters or check back soon.
              </p>
            </motion.div>
          )}
        </div>
      </section>
    </>
  );
}

export function EventsContent({
  events,
  featuredEvent,
}: {
  events: SanityEvent[];
  featuredEvent: SanityEvent | null;
}) {
  return (
    <Suspense>
      <EventsInner events={events} featuredEvent={featuredEvent} />
    </Suspense>
  );
}
