import { ListingType, Prisma } from "@prisma/client";

export interface RawListing {
  sourceId: string;
  title: string;
  description?: string;
  url: string;
  imageUrl?: string;
  location?: string;
  metadata?: Prisma.JsonValue;
  publishedAt?: Date;
  expiresAt?: Date;
}

export interface AdapterResult {
  found: number;
  created: number;
  updated: number;
  skipped: number;
}

export abstract class BaseAdapter {
  abstract readonly name: string;
  abstract readonly type: ListingType;

  /** How often this adapter should run (in minutes) */
  abstract readonly intervalMinutes: number;

  /** Fetch listings from the source */
  abstract fetch(): Promise<RawListing[]>;
}
