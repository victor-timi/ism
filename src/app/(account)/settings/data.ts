import { HiSun, HiMoon, HiComputerDesktop } from "react-icons/hi2";
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
