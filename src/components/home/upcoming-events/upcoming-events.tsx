import Link from "next/link";
import { client, homepageEventsQuery } from "@/lib/sanity";
import { Button } from "@/components/ui/button";
import { EventCard } from "@/components/events/event-card";
import { ROUTES } from "@/lib/routes";
import type { SanityEvent } from "@/types/event";

export async function UpcomingEvents() {
  const events = await client.fetch<SanityEvent[]>(homepageEventsQuery);

  if (!events || events.length === 0) return null;

  return (
    <section className="relative overflow-hidden bg-[var(--ism-bg)] px-6 py-24 lg:px-12 lg:py-36 xl:px-16">
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(245,158,11,0.06) 0%, transparent 70%)",
          filter: "blur(120px)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-500">
          Upcoming Events
        </p>

        <h2 className="text-h2 mt-4 text-[var(--ism-fg)]">
          Don&rsquo;t miss out.
        </h2>

        <p className="text-body-lg mt-4 max-w-xl text-[var(--ism-fg-muted)]">
          Student events happening soon — meetups, career fairs, cultural
          nights, and more.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event, i) => (
            <EventCard key={event._id} event={event} index={i} />
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Button variant="outline" size="lg" asChild>
            <Link href={ROUTES.hubEvents}>View all events</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
