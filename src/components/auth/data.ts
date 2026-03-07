import { HiBriefcase, HiHome, HiTag, HiCalendarDays } from "react-icons/hi2";
import type { IconType } from "react-icons";

export interface VariantContent {
  headline: React.ReactNode;
  description: string;
  stats: {
    value: string;
    target: number;
    label: string;
    format: (n: number) => string;
  }[];
}

export interface NetworkNode {
  id: string;
  x: number;
  y: number;
  icon?: IconType;
  label?: string;
  delay: number;
}

export const nodes: NetworkNode[] = [
  { id: "jobs", x: 20, y: 28, icon: HiBriefcase, label: "Jobs", delay: 0 },
  { id: "housing", x: 75, y: 22, icon: HiHome, label: "Housing", delay: 0.3 },
  { id: "deals", x: 28, y: 72, icon: HiTag, label: "Deals", delay: 0.6 },
  { id: "events", x: 78, y: 68, icon: HiCalendarDays, label: "Events", delay: 0.45 },
  { id: "n1", x: 8, y: 50, delay: 0.2 },
  { id: "n2", x: 90, y: 45, delay: 0.5 },
  { id: "n3", x: 48, y: 12, delay: 0.1 },
  { id: "n4", x: 50, y: 48, delay: 0.4 },
  { id: "n5", x: 18, y: 88, delay: 0.7 },
  { id: "n6", x: 88, y: 85, delay: 0.35 },
];

export const connections: [string, string][] = [
  ["jobs", "n3"], ["jobs", "n1"], ["jobs", "n4"],
  ["housing", "n3"], ["housing", "n2"], ["housing", "n4"],
  ["deals", "n4"], ["deals", "n5"], ["deals", "n1"],
  ["events", "n4"], ["events", "n6"], ["events", "n2"],
  ["n1", "n5"], ["n2", "n6"], ["n3", "n4"],
  ["jobs", "housing"], ["housing", "events"], ["events", "deals"], ["deals", "jobs"],
];
