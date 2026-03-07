import { HiBriefcase, HiHome } from "react-icons/hi2";
import type { IconType } from "react-icons";
import { ROUTES } from "@/lib/routes";

export interface NavLink {
  href: string;
  label: string;
  icon: IconType;
}

export const navLinks: NavLink[] = [
  { href: ROUTES.hub, label: "Hub", icon: HiBriefcase },
  { href: ROUTES.about, label: "About", icon: HiHome },
];

export const browseLinks = [
  { label: "Jobs", href: ROUTES.hubJobs },
  { label: "Housing", href: ROUTES.hubHousing },
  { label: "Discounts", href: ROUTES.hubDiscounts },
  { label: "Events", href: ROUTES.hubEvents },
];

export const resourceLinks = [
  { label: "About", href: ROUTES.about },
  { label: "Blog", href: ROUTES.blog },
  { label: "Forum", href: ROUTES.forum },
];

export const companyLinks = [
  { label: "Contact", href: ROUTES.contact },
  { label: "Privacy", href: ROUTES.privacy },
  { label: "Terms", href: ROUTES.terms },
];

export const socialLinks = [
  { label: "Instagram", href: "#" },
  { label: "Twitter / X", href: "#" },
  { label: "LinkedIn", href: "#" },
];
