import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { findSavedEvent, toggleSavedEvent } from "@/lib/mock-db";

export async function GET(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ saved: false });
  }

  const { searchParams } = new URL(req.url);
  const eventId = searchParams.get("eventId");
  if (!eventId) {
    return NextResponse.json({ saved: false });
  }

  const existing = findSavedEvent(session.user.id, eventId);
  return NextResponse.json({ saved: !!existing });
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const eventId = body.eventId as string | undefined;
  if (!eventId) {
    return NextResponse.json({ error: "Missing eventId" }, { status: 400 });
  }

  const saved = toggleSavedEvent(session.user.id, eventId);
  return NextResponse.json({ saved });
}
