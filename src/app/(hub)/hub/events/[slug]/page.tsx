import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { client, eventBySlugQuery, relatedEventsQuery } from "@/lib/sanity";
import type { SanityEvent } from "@/types/event";
import { EventDetailContent } from "./event-detail-content";

interface EventPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: EventPageProps): Promise<Metadata> {
  const { slug } = await params;
  const event = await client.fetch<SanityEvent | null>(eventBySlugQuery, {
    slug,
  });

  if (!event) return { title: "Event Not Found" };

  return {
    title: event.title,
    description: event.snippet ?? `${event.title} — ${event.location}`,
  };
}

export default async function EventDetailPage({ params }: EventPageProps) {
  const { slug } = await params;
  const [event, relatedEvents] = await Promise.all([
    client.fetch<SanityEvent | null>(eventBySlugQuery, { slug }),
    client.fetch<SanityEvent[]>(relatedEventsQuery, { slug }),
  ]);

  if (!event) notFound();

  return <EventDetailContent event={event} relatedEvents={relatedEvents} />;
}
