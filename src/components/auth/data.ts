import { HiBriefcase, HiHome, HiTag } from "react-icons/hi2";
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
  { id: "jobs", x: 22, y: 30, icon: HiBriefcase, label: "Jobs", delay: 0 },
  { id: "housing", x: 72, y: 22, icon: HiHome, label: "Housing", delay: 0.3 },
  { id: "deals", x: 50, y: 68, icon: HiTag, label: "Deals", delay: 0.6 },
  { id: "n1", x: 10, y: 58, delay: 0.2 },
  { id: "n2", x: 85, y: 52, delay: 0.5 },
  { id: "n3", x: 38, y: 15, delay: 0.1 },
  { id: "n4", x: 60, y: 45, delay: 0.4 },
  { id: "n5", x: 28, y: 78, delay: 0.7 },
  { id: "n6", x: 78, y: 75, delay: 0.35 },
];

export const connections: [string, string][] = [
  ["jobs", "n3"], ["jobs", "n1"], ["jobs", "n4"],
  ["housing", "n3"], ["housing", "n2"], ["housing", "n4"],
  ["deals", "n4"], ["deals", "n5"], ["deals", "n6"],
  ["n1", "n5"], ["n2", "n6"], ["n3", "n4"],
  ["jobs", "housing"], ["housing", "deals"], ["deals", "jobs"],
];
