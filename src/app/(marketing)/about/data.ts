import {
  HiBriefcase,
  HiHome,
  HiTag,
  HiLightBulb,
  HiRocketLaunch,
  HiCpuChip,
  HiGlobeAlt,
} from "react-icons/hi2";
import type { IconType } from "react-icons";

export interface Stat {
  value: string;
  target: number;
  label: string;
  format: (n: number) => string;
}

export const stats: Stat[] = [
  {
    value: "833,000+",
    target: 833000,
    label: "International students",
    format: (n: number) => Math.round(n).toLocaleString() + "+",
  },
  {
    value: "6",
    target: 6,
    label: "Major cities",
    format: (n: number) => Math.round(n).toString(),
  },
  {
    value: "3",
    target: 3,
    label: "Categories",
    format: (n: number) => Math.round(n).toString(),
  },
];

export interface Offering {
  icon: IconType;
  title: string;
  description: string;
  gradient: string;
}

export const offerings: Offering[] = [
  {
    icon: HiBriefcase,
    title: "Jobs",
    description:
      "Part-time, casual, and graduate positions curated for students with flexible hours and fair pay.",
    gradient: "from-emerald-500/20 via-emerald-400/10 to-transparent",
  },
  {
    icon: HiHome,
    title: "Housing",
    description:
      "Share rooms, apartments, and student accommodation near your campus at affordable prices.",
    gradient: "from-sky-500/20 via-cyan-400/10 to-transparent",
  },
  {
    icon: HiTag,
    title: "Discounts",
    description:
      "Exclusive student deals from Australian brands — food, tech, transport, and more.",
    gradient: "from-orange-500/20 via-amber-400/10 to-transparent",
  },
];

export interface TimelineStep {
  icon: IconType;
  title: string;
  description: string;
}

export const timeline: TimelineStep[] = [
  {
    icon: HiLightBulb,
    title: "The Problem",
    description:
      "International students spend hours searching across dozens of websites for jobs, housing, and deals — often falling victim to scams.",
  },
  {
    icon: HiRocketLaunch,
    title: "The Spark",
    description:
      "A group of international students decided enough was enough. They envisioned a single, trusted platform built by students who understood the struggle.",
  },
  {
    icon: HiCpuChip,
    title: "The Platform",
    description:
      "ISM was born — an aggregation hub that brings verified listings, community connections, and real-time alerts to one beautiful interface.",
  },
  {
    icon: HiGlobeAlt,
    title: "The Future",
    description:
      "We're expanding to every city, adding AI-powered recommendations, and building the world's largest international student network.",
  },
];
