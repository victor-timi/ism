import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

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

  const existing = await prisma.savedEvent.findUnique({
    where: {
      userId_sanityEventId: {
        userId: session.user.id,
        sanityEventId: eventId,
      },
    },
  });

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

  const existing = await prisma.savedEvent.findUnique({
    where: {
      userId_sanityEventId: {
        userId: session.user.id,
        sanityEventId: eventId,
      },
    },
  });

  if (existing) {
    await prisma.savedEvent.delete({ where: { id: existing.id } });
    return NextResponse.json({ saved: false });
  }

  await prisma.savedEvent.create({
    data: {
      userId: session.user.id,
      sanityEventId: eventId,
    },
  });

  return NextResponse.json({ saved: true });
}
