import { HiBookmark, HiBell, HiCog6Tooth } from "react-icons/hi2";
import type { IconType } from "react-icons";

export interface AccountNavItem {
  label: string;
  href: string;
  icon: IconType;
}

export const navItems: AccountNavItem[] = [
  { label: "Saved Items", href: "/saved", icon: HiBookmark },
  { label: "Alerts", href: "/alerts", icon: HiBell },
  { label: "Settings", href: "/settings", icon: HiCog6Tooth },
];
