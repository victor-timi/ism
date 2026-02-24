import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about the International Students Movement and our mission.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold">About ISM</h1>

      <div className="prose prose-neutral dark:prose-invert mt-8 max-w-none">
        <p className="text-muted-foreground text-lg">
          The International Students Movement (ISM) is a platform built to help international
          students in Australia navigate the challenges of finding jobs, housing, and student
          discounts.
        </p>

        <h2 className="mt-8 text-2xl font-semibold">Our Mission</h2>
        <p className="text-muted-foreground">
          We believe every international student deserves easy access to opportunities. Our platform
          aggregates listings from trusted sources across Australia, saving you hours of searching
          across multiple websites.
        </p>

        <h2 className="mt-8 text-2xl font-semibold">What We Offer</h2>
        <ul className="text-muted-foreground mt-4 list-inside list-disc space-y-2">
          <li>
            <strong>Jobs:</strong> Part-time, casual, and graduate positions that work around your
            study schedule
          </li>
          <li>
            <strong>Housing:</strong> Shared rooms, apartments, and student accommodation listings
          </li>
          <li>
            <strong>Discounts:</strong> Student deals and exclusive offers from Australian brands
          </li>
          <li>
            <strong>Alerts:</strong> Get notified when new listings match your preferences
          </li>
        </ul>

        <h2 className="mt-8 text-2xl font-semibold">Built for Students, by Students</h2>
        <p className="text-muted-foreground">
          ISM was created by international students who experienced firsthand the difficulty of
          settling into a new country. We understand the unique challenges you face and are committed
          to making your transition smoother.
        </p>
      </div>
    </div>
  );
}
