import { NextResponse } from "next/server";

import { getDb } from "@/lib/db";
import { contactSubmissions } from "@/lib/schema";
import { contactSubmissionSchema } from "@/lib/validators/contact";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = contactSubmissionSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues }, { status: 400 });
  }

  const { website, ...fields } = parsed.data;
  if (website && website.trim().length > 0) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  try {
    const db = getDb();
    await db.insert(contactSubmissions).values({
      firstName: fields.firstName,
      lastName: fields.lastName,
      email: fields.email,
      role: fields.role,
      topic: fields.topic,
      message: fields.message,
    });
  } catch {
    return NextResponse.json({ error: "Could not save your message. Please try again later." }, { status: 500 });
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
