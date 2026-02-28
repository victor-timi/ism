import {
  HiChatBubbleLeftRight,
  HiUserGroup,
  HiCalendarDays,
} from "react-icons/hi2";
import type { IconType } from "react-icons";

export interface Feature {
  icon: IconType;
  title: string;
  description: string;
  gradient: string;
}

export const features: Feature[] = [
  {
    icon: HiChatBubbleLeftRight,
    title: "Forum Discussions",
    description:
      "Ask questions, share advice, and connect with students across Australia in our moderated forum.",
    gradient: "from-emerald-500/20 via-emerald-400/10 to-transparent",
  },
  {
    icon: HiUserGroup,
    title: "Local Groups",
    description:
      "Find students in your city, campus, or course. Join local groups to meet people who get it.",
    gradient: "from-sky-500/20 via-cyan-400/10 to-transparent",
  },
  {
    icon: HiCalendarDays,
    title: "Events",
    description:
      "Discover student meetups, career fairs, cultural events, and social gatherings near you.",
    gradient: "from-violet-500/20 via-purple-400/10 to-transparent",
  },
];

export interface CommunityStat {
  value: string;
  target: number;
  label: string;
  format: (n: number) => string;
}

export const communityStats: CommunityStat[] = [
  {
    value: "833,000+",
    target: 833000,
    label: "Students",
    format: (n: number) => Math.round(n).toLocaleString() + "+",
  },
  {
    value: "247",
    target: 247,
    label: "Online now",
    format: (n: number) => Math.round(n).toString(),
  },
  {
    value: "14",
    target: 14,
    label: "New posts today",
    format: (n: number) => Math.round(n).toString(),
  },
];
