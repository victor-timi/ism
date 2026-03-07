/**
 * In-memory mock database for development.
 * Replace with real Prisma DB calls in Milestone 2.
 *
 * Uses globalThis so the same data is shared across all
 * server-side module instances (API routes, NextAuth handler, etc.).
 */

import bcryptjs from "bcryptjs";

export interface MockUser {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
}

interface SavedEventEntry {
  id: string;
  userId: string;
  sanityEventId: string;
}

// ── Shared globals ──────────────────────────────────────────────────────────

const g = globalThis as unknown as {
  __mockUsers?: Map<string, MockUser>;
  __mockUserIdCounter?: number;
  __mockSavedEvents?: SavedEventEntry[];
  __mockSavedIdCounter?: number;
};

if (!g.__mockUsers) g.__mockUsers = new Map<string, MockUser>();
if (!g.__mockUserIdCounter) g.__mockUserIdCounter = 0;
if (!g.__mockSavedEvents) g.__mockSavedEvents = [];
if (!g.__mockSavedIdCounter) g.__mockSavedIdCounter = 0;

// ── Users ───────────────────────────────────────────────────────────────────

const users = g.__mockUsers;

let userIdCounter = g.__mockUserIdCounter;

function generateId(): string {
  g.__mockUserIdCounter = (g.__mockUserIdCounter ?? 0) + 1;
  userIdCounter = g.__mockUserIdCounter;
  return `mock_${Date.now()}_${userIdCounter}`;
}

export async function findUserByEmail(
  email: string,
): Promise<MockUser | null> {
  for (const user of users.values()) {
    if (user.email === email) return user;
  }
  return null;
}

export async function createUser(
  name: string,
  email: string,
  password: string,
): Promise<MockUser> {
  const passwordHash = await bcryptjs.hash(password, 12);
  const user: MockUser = {
    id: generateId(),
    name,
    email,
    passwordHash,
  };
  users.set(user.id, user);
  return user;
}

// ── Saved Events ────────────────────────────────────────────────────────────

const savedEvents = g.__mockSavedEvents!;

let savedIdCounter = g.__mockSavedIdCounter!;

export function findSavedEvent(
  userId: string,
  sanityEventId: string,
): SavedEventEntry | undefined {
  return savedEvents.find(
    (e) => e.userId === userId && e.sanityEventId === sanityEventId,
  );
}

export function toggleSavedEvent(
  userId: string,
  sanityEventId: string,
): boolean {
  const idx = savedEvents.findIndex(
    (e) => e.userId === userId && e.sanityEventId === sanityEventId,
  );
  if (idx >= 0) {
    savedEvents.splice(idx, 1);
    return false; // unsaved
  }
  g.__mockSavedIdCounter = (g.__mockSavedIdCounter ?? 0) + 1;
  savedIdCounter = g.__mockSavedIdCounter;
  savedEvents.push({
    id: `se_${savedIdCounter}`,
    userId,
    sanityEventId,
  });
  return true; // saved
}
