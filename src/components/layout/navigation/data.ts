import type { NavItem, NavChild } from "./types";

export const navItems: NavItem[] = [
  {
    label: "Hub",
    href: "/hub",
    headline: "Find what you need\nas a student in Australia",
    children: [
      {
        label: "Part-Time Jobs",
        href: "/hub?tab=jobs",
        description: "Casual & part-time work opportunities",
      },
      {
        label: "Accommodation",
        href: "/hub?tab=housing",
        description: "Share housing & flatmate listings",
      },
      {
        label: "Student Discounts",
        href: "/hub?tab=discounts",
        description: "Verified deals & savings for students",
      },
    ],
  },
  {
    label: "Resources",
    href: "/about",
    headline: "Everything you need to\nstay connected and informed",
    children: [
      {
        label: "About ISM",
        href: "/about",
        description: "Our mission & story",
      },
      {
        label: "Blog",
        href: "/blog",
        description: "Guides, tips & student news",
      },
      {
        label: "Community",
        href: "/community",
        description: "Connect with other students",
      },
    ],
  },
  { label: "Forum", href: "/forum" },
  { label: "Contact", href: "/contact" },
];

export const accountLinks: NavChild[] = [
  { label: "Saved Items", href: "/saved", description: "Your bookmarked listings" },
  { label: "Alerts", href: "/alerts", description: "Notification preferences" },
  { label: "Settings", href: "/settings", description: "Account & profile" },
];
