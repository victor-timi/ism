import type { NavItem, NavChild } from "./types";
import { ROUTES } from "@/lib/routes";

export const navItems: NavItem[] = [
  {
    label: "Hub",
    href: ROUTES.hub,
    headline: "Find what you need\nas a student in Australia",
    children: [
      {
        label: "Part-Time Jobs",
        href: ROUTES.hubJobs,
        description: "Casual & part-time work opportunities",
      },
      {
        label: "Accommodation",
        href: ROUTES.hubHousing,
        description: "Share housing & flatmate listings",
      },
      {
        label: "Student Discounts",
        href: ROUTES.hubDiscounts,
        description: "Verified deals & savings for students",
      },
      {
        label: "Events",
        href: ROUTES.hubEvents,
        description: "Student events & meetups near you",
      },
    ],
  },
  {
    label: "Resources",
    href: ROUTES.about,
    headline: "Everything you need to\nstay connected and informed",
    children: [
      {
        label: "About ISM",
        href: ROUTES.about,
        description: "Our mission & story",
      },
      {
        label: "Blog",
        href: ROUTES.blog,
        description: "Guides, tips & student news",
      },
    ],
  },
  { label: "Forum", href: ROUTES.forum },
  { label: "Contact", href: ROUTES.contact },
];

export const accountLinks: NavChild[] = [
  { label: "Saved Items", href: ROUTES.saved, description: "Your bookmarked listings" },
  { label: "Alerts", href: ROUTES.alerts, description: "Notification preferences" },
  { label: "Settings", href: ROUTES.settings, description: "Account & profile" },
];
