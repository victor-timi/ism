import { Hero } from "@/components/home/hero";
import { ValueProposition } from "@/components/home/value-proposition";
import { GettingStarted } from "@/components/home/getting-started";
import { FAQ } from "@/components/home/faq";
import { CTA } from "@/components/home/cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ValueProposition />
      <GettingStarted />
      <FAQ />
      <CTA />
    </>
  );
}
