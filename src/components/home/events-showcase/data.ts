import {
  HiMagnifyingGlass,
  HiDocumentText,
  HiBolt,
  HiMapPin,
  HiSquares2X2,
  HiCalendarDays,
} from "react-icons/hi2";
import type { IconType } from "react-icons";

/* ═══════════════════════════════════════════
   Static data for the Events Showcase section
   ═══════════════════════════════════════════ */

/* ── Section copy ── */

export const sectionCopy = {
  label: "Events Experience",
  heading: "Your next event, one tap away.",
  description:
    "From casual meetups to career fairs — discover, explore, and register for student events across 7+ cities in Australia.",
};

/* ── Step definitions ── */

export interface Step {
  id: "discover" | "explore" | "act";
  label: string;
  icon: IconType;
}

export const steps: Step[] = [
  { id: "discover", label: "Discover", icon: HiMagnifyingGlass },
  { id: "explore", label: "Explore", icon: HiDocumentText },
  { id: "act", label: "Act", icon: HiBolt },
];

/* ── Discover scene data ── */

export const cityFilters = [
  "Sydney",
  "Melbourne",
  "Brisbane",
  "Perth",
  "Adelaide",
  "Gold Coast",
  "Canberra",
];

export const categoryFilters = [
  "Social",
  "Career",
  "Academic",
  "Cultural",
  "Sports",
  "Workshop",
];

export interface MockEvent {
  title: string;
  date: string;
  time: string;
  location: string;
  category: string;
  featured?: boolean;
  attendees: number;
  imageGradient: string;
}

export const mockEvents: MockEvent[] = [
  {
    title: "International Student Welcome Night",
    date: "Mar 15",
    time: "6:00 PM",
    location: "Sydney",
    category: "Social",
    featured: true,
    attendees: 234,
    imageGradient:
      "linear-gradient(135deg, rgba(245,158,11,0.4) 0%, rgba(217,119,6,0.2) 50%, rgba(180,83,9,0.3) 100%)",
  },
  {
    title: "Tech Career Fair 2026",
    date: "Mar 22",
    time: "10:00 AM",
    location: "Melbourne",
    category: "Career",
    attendees: 156,
    imageGradient:
      "linear-gradient(135deg, rgba(99,102,241,0.4) 0%, rgba(79,70,229,0.2) 50%, rgba(67,56,202,0.3) 100%)",
  },
  {
    title: "Cultural Festival & Food Market",
    date: "Mar 29",
    time: "12:00 PM",
    location: "Brisbane",
    category: "Cultural",
    attendees: 89,
    imageGradient:
      "linear-gradient(135deg, rgba(236,72,153,0.4) 0%, rgba(219,39,119,0.2) 50%, rgba(190,24,93,0.3) 100%)",
  },
];

/* ── Explore scene data ── */

export const exploreEvent = {
  category: "Social",
  title: "International Student Welcome Night",
  date: "Saturday, Mar 15, 2026",
  time: "6:00 PM — 10:00 PM",
  location: "Sydney Town Hall",
  host: "ISM Community",
  hostSub: "Hosted by verified organiser",
  cta: "Register Now",
  attendees: 234,
  rating: 4.8,
  attendeeAvatars: ["JK", "AL", "MP", "SR", "TC"],
  attendeeColors: [
    "bg-blue-500",
    "bg-emerald-500",
    "bg-amber-500",
    "bg-purple-500",
    "bg-rose-500",
  ],
};

/* ── Act scene data ── */

export const actActions = [
  {
    id: "calendar" as const,
    label: "Add to Calendar",
    description: "Syncs to your Google or Apple calendar",
    toast: "Added to Google Calendar",
    bgColor: "bg-emerald-500/15",
    textColor: "text-emerald-400",
    accentColor: "emerald",
  },
  {
    id: "save" as const,
    label: "Save Event",
    description: "Bookmark events for later",
    toast: "Saved to your collection",
    bgColor: "bg-amber-500/15",
    textColor: "text-amber-400",
    accentColor: "amber",
  },
  {
    id: "share" as const,
    label: "Share",
    description: "Send to friends instantly",
    toast: "Link copied!",
    bgColor: "bg-sky-500/15",
    textColor: "text-sky-400",
    accentColor: "sky",
  },
];

export const sharePlatforms = ["WhatsApp", "Copy Link", "Message"];

/* ── Explore — similar events ── */

export const similarEvents = [
  {
    title: "Sydney Harbor Cruise Night",
    date: "Mar 18",
    attendees: 89,
    gradient:
      "linear-gradient(135deg, rgba(14,165,233,0.45) 0%, rgba(2,132,199,0.25) 100%)",
  },
  {
    title: "Resume & Portfolio Workshop",
    date: "Mar 20",
    attendees: 45,
    gradient:
      "linear-gradient(135deg, rgba(16,185,129,0.45) 0%, rgba(4,120,87,0.25) 100%)",
  },
  {
    title: "Language Exchange Meetup",
    date: "Mar 21",
    attendees: 67,
    gradient:
      "linear-gradient(135deg, rgba(168,85,247,0.45) 0%, rgba(139,92,246,0.25) 100%)",
  },
];

/* ── Feature highlights ── */

export interface Highlight {
  icon: IconType;
  value: string;
  sub: string;
  pill: string;
  decorativeNumber: string;
  accentColor: string;
  bgColor: string;
  bgColorSubtle: string;
  gradient: string;
}

export const highlights: Highlight[] = [
  {
    icon: HiMapPin,
    value: "7+ Cities",
    sub: "Across Australia",
    pill: "Currently live",
    decorativeNumber: "7+",
    accentColor: "text-emerald-400",
    bgColor: "rgba(4,120,87,0.15)",
    bgColorSubtle: "rgba(4,120,87,0.05)",
    gradient: "from-emerald-500/20 via-emerald-500/10 to-transparent",
  },
  {
    icon: HiSquares2X2,
    value: "6 Categories",
    sub: "Social to Career",
    pill: "Updated weekly",
    decorativeNumber: "6",
    accentColor: "text-amber-400",
    bgColor: "rgba(245,158,11,0.15)",
    bgColorSubtle: "rgba(245,158,11,0.05)",
    gradient: "from-amber-500/20 via-amber-500/10 to-transparent",
  },
  {
    icon: HiCalendarDays,
    value: "One-Click",
    sub: "Calendar Sync",
    pill: "One-tap sync",
    decorativeNumber: "1",
    accentColor: "text-sky-400",
    bgColor: "rgba(14,165,233,0.15)",
    bgColorSubtle: "rgba(14,165,233,0.05)",
    gradient: "from-sky-500/20 via-sky-500/10 to-transparent",
  },
];

/* ── Floating badges ── */

export const floatingBadges = {
  discover: "12 new events this week",
  explore: "Trending in Sydney",
  act: "847 students browsing",
};
