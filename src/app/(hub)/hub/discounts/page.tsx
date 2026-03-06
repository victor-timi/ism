import type { Metadata } from "next";
import { DiscountsContent } from "./discounts-content";

export const metadata: Metadata = {
  title: "Student Discounts",
  description:
    "Discover student discounts on food, tech, transport, entertainment, and more across Australia.",
};

export default function DiscountsPage() {
  return <DiscountsContent />;
}
