import { HiBriefcase, HiHome, HiTag } from "react-icons/hi2";
import type { IconType } from "react-icons";

export interface SavedFilter {
  label: string;
  value: string;
  icon?: IconType;
}

export const filters: SavedFilter[] = [
  { label: "All", value: "all" },
  { label: "Jobs", value: "jobs", icon: HiBriefcase },
  { label: "Housing", value: "housing", icon: HiHome },
  { label: "Discounts", value: "discounts", icon: HiTag },
];
