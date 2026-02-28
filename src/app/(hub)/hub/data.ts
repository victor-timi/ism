import { HiBriefcase, HiHome, HiTag } from "react-icons/hi2";
import type { IconType } from "react-icons";
import { mockListings } from "@/components/hub/mock-data";

export interface HubTab {
  value: string;
  label: string;
  icon: IconType;
  count: number;
}

export const tabs: HubTab[] = [
  {
    value: "jobs",
    label: "Jobs",
    icon: HiBriefcase,
    count: mockListings.filter((l) => l.category === "jobs").length,
  },
  {
    value: "housing",
    label: "Housing",
    icon: HiHome,
    count: mockListings.filter((l) => l.category === "housing").length,
  },
  {
    value: "discounts",
    label: "Discounts",
    icon: HiTag,
    count: mockListings.filter((l) => l.category === "discounts").length,
  },
];
