import type { Metadata } from "next";
import { HubContent } from "./hub-content";

export const metadata: Metadata = {
  title: "Hub — Explore",
  description:
    "Your one-stop hub for part-time jobs, housing, student discounts, and events across Australia.",
};

export default function HubPage() {
  return <HubContent />;
}
