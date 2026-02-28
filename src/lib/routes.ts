/**
 * Centralized route constants.
 * Import from here instead of hardcoding strings.
 */

// ─── Auth ────────────────────────────────────────────────────────────────────
export const ROUTES = {
  home: "/",
  signIn: "/sign-in",
  signUp: "/sign-up",

  // Hub
  hub: "/hub",
  hubJobs: "/hub?tab=jobs",
  hubHousing: "/hub?tab=housing",
  hubDiscounts: "/hub?tab=discounts",

  // Account (protected)
  saved: "/saved",
  alerts: "/alerts",
  settings: "/settings",

  // Marketing
  about: "/about",
  blog: "/blog",
  community: "/community",
  forum: "/forum",
  contact: "/contact",

  // Legal
  privacy: "/privacy",
  terms: "/terms",

  // CMS
  studio: "/studio",
} as const;
