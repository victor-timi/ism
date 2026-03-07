import {
  HiSun,
  HiMoon,
  HiComputerDesktop,
  HiEnvelope,
  HiClock,
  HiMapPin,
} from "react-icons/hi2";
import type { IconType } from "react-icons";

export interface ThemeOption {
  value: "light" | "dark" | "system";
  label: string;
  icon: IconType;
  description: string;
}

export const themeOptions: ThemeOption[] = [
  {
    value: "light",
    label: "Light",
    icon: HiSun,
    description: "Warm cream tones",
  },
  {
    value: "dark",
    label: "Dark",
    icon: HiMoon,
    description: "Easy on the eyes",
  },
  {
    value: "system",
    label: "System",
    icon: HiComputerDesktop,
    description: "Match your device",
  },
];

export interface PreferenceItem {
  label: string;
  description: string;
  icon: IconType;
}

export const preferenceItems: PreferenceItem[] = [
  {
    label: "Email Notifications",
    description: "Receive alerts and updates via email",
    icon: HiEnvelope,
  },
  {
    label: "Alert Frequency",
    description: "Control how often you receive listing alerts",
    icon: HiClock,
  },
  {
    label: "Preferred Cities",
    description: "Prioritise specific cities in your feed",
    icon: HiMapPin,
  },
];
