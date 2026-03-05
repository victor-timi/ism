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

// ─── Event Queries ──────────────────────────────────────────────────────────

const eventProjection = `{
  _id,
  title,
  "slug": slug.current,
  image,
  datetime,
  endDatetime,
  location,
  address,
  city,
  category,
  cost,
  registrationUrl,
  isFeatured,
  snippet,
  description,
  hostName,
  hostLogo,
  hostUrl
}`;

export const upcomingEventsQuery = groq`*[_type == "event" && datetime >= now()] | order(datetime asc) [0...12] ${eventProjection}`;

export const featuredEventQuery = groq`*[_type == "event" && isFeatured == true && datetime >= now()] | order(datetime asc) [0] ${eventProjection}`;

export const eventBySlugQuery = groq`*[_type == "event" && slug.current == $slug][0] ${eventProjection}`;

export const allEventsQuery = groq`*[_type == "event" && datetime >= now()
  && ($city == "all" || city == $city)
  && ($category == "all" || category == $category)
] | order(datetime asc) ${eventProjection}`;

export const homepageEventsQuery = groq`*[_type == "event" && datetime >= now()] | order(datetime asc) [0...3] ${eventProjection}`;

export const relatedEventsQuery = groq`*[_type == "event" && datetime >= now() && slug.current != $slug] | order(datetime asc) [0...3] ${eventProjection}`;
