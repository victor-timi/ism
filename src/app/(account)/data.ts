import { HiBookmark, HiBell, HiCog6Tooth } from "react-icons/hi2";
import type { IconType } from "react-icons";
import { ROUTES } from "@/lib/routes";

export interface AccountNavItem {
  label: string;
  href: string;
  icon: IconType;
}

export const navItems: AccountNavItem[] = [
  { label: "Saved Items", href: ROUTES.saved, icon: HiBookmark },
  { label: "Alerts", href: ROUTES.alerts, icon: HiBell },
  { label: "Settings", href: ROUTES.settings, icon: HiCog6Tooth },
];
