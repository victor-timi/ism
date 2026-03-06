import type { Metadata } from "next";
import { client, upcomingEventsQuery, featuredEventQuery } from "@/lib/sanity";
import { EventsContent } from "./events-content";
import type { SanityEvent } from "@/types/event";
import { mockEvents, mockFeaturedEvent } from "./mock-events";

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

  // Use mock data for client review when Sanity has no published events
  const displayEvents = events.length > 0 ? events : mockEvents;
  const displayFeatured = featuredEvent ?? mockFeaturedEvent;

  return (
    <EventsContent events={displayEvents} featuredEvent={displayFeatured} />
  );
}
