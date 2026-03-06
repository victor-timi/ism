import type { Metadata } from "next";
import { JobsContent } from "./jobs-content";

export const metadata: Metadata = {
  title: "Part-Time Jobs",
  description:
    "Find visa-friendly part-time jobs, casual work, and internships for international students across Australia.",
};

export default function JobsPage() {
  return <JobsContent />;
}
