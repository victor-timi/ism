import type { PortableTextBlock } from "next-sanity";
import type { SanityImageSource } from "@sanity/image-url";

export interface SanityEvent {
  _id: string;
  title: string;
  slug: string;
  image?: SanityImageSource;
  datetime: string;
  endDatetime?: string;
  location: string;
  address?: string;
  city: string;
  category: string;
  cost?: string;
  registrationUrl?: string;
  isFeatured?: boolean;
  snippet?: string;
  description?: PortableTextBlock[];
  hostName?: string;
  hostLogo?: SanityImageSource;
  hostUrl?: string;
}

export type EventCard = Pick<
  SanityEvent,
  | "_id"
  | "title"
  | "slug"
  | "image"
  | "datetime"
  | "endDatetime"
  | "location"
  | "city"
  | "category"
  | "cost"
  | "snippet"
  | "registrationUrl"
>;
