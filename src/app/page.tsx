import { Hero } from "@/components/home/hero";
import { StudentCommunity, ValueProposition } from "@/components/home/value-proposition";
import { EventsShowcase } from "@/components/home/events-showcase";
import { UpcomingEvents } from "@/components/home/upcoming-events";
import { GettingStarted } from "@/components/home/getting-started";
import { FAQ } from "@/components/home/faq";
import { CTA } from "@/components/home/cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <StudentCommunity />
      <EventsShowcase />
      <ValueProposition />
      <UpcomingEvents />
      <GettingStarted />
      <FAQ />
      <CTA />
    </>
  );
}
