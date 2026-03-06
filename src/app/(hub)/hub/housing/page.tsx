import type { Metadata } from "next";
import { HousingContent } from "./housing-content";

export const metadata: Metadata = {
  title: "Student Housing",
  description:
    "Find verified student housing, share houses, studios, and accommodation near campuses across Australia.",
};

export default function HousingPage() {
  return <HousingContent />;
}
