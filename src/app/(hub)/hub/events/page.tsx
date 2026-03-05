import type { Metadata } from "next";
import { client, upcomingEventsQuery, featuredEventQuery } from "@/lib/sanity";
import { EventsContent } from "./events-content";
import type { SanityEvent } from "@/types/event";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Student events across Australia — meetups, career fairs, cultural nights, and more.",
};

export default async function EventsPage() {
  const [events, featuredEvent] = await Promise.all([
    client.fetch<SanityEvent[]>(upcomingEventsQuery),
    client.fetch<SanityEvent | null>(featuredEventQuery),
  ]);

  return <EventsContent events={events} featuredEvent={featuredEvent} />;
}
