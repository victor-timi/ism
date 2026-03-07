import { NextResponse } from "next/server";
import { registerBodySchema } from "@/lib/validations";
import { findUserByEmail, createUser } from "@/lib/mock-db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = registerBodySchema.safeParse(body);

    if (!result.success) {
      const fieldErrors: Record<string, string[]> = {};
      for (const issue of result.error.issues) {
        const key = issue.path.join(".");
        if (!fieldErrors[key]) fieldErrors[key] = [];
        fieldErrors[key].push(issue.message);
      }
      return NextResponse.json(
        { error: "Validation failed", fieldErrors },
        { status: 400 },
      );
    }

    const { name, email, password } = result.data;

    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return NextResponse.json({ error: "Email already in use" }, { status: 409 });
    }

    const user = await createUser(name, email, password);

    return NextResponse.json(
      { user: { id: user.id, name: user.name, email: user.email } },
      { status: 201 },
    );
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
