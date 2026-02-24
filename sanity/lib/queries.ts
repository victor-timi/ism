import { groq } from "next-sanity";

export const siteSettingsQuery = groq`*[_type == "siteSettings"][0]{
  siteName,
  tagline,
  heroHeading,
  heroSubheading,
  heroCta,
  footerText
}`;

export const announcementsQuery = groq`*[_type == "announcement" && isActive == true] | order(publishedAt desc) [0...5]{
  _id,
  title,
  body,
  link,
  publishedAt
}`;

export const homepageStatsQuery = groq`*[_type == "homepageStats"][0]{
  jobsCount,
  housingCount,
  discountsCount,
  membersCount
}`;

export const pageBySlugQuery = groq`*[_type == "page" && slug.current == $slug][0]{
  title,
  description,
  body
}`;

export const allPagesQuery = groq`*[_type == "page"]{
  title,
  "slug": slug.current
}`;
