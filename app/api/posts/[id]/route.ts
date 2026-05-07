import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

import { requireAdminSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { posts } from "@/lib/schema";
import { updatePostSchema } from "@/lib/validators/post";

type ParamsContext = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: ParamsContext) {
  const { id } = await params;
  const adminSession = await requireAdminSession();

  const [post] = await db.select().from(posts).where(eq(posts.id, id)).limit(1);
  if (!post) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }
  if (post.status !== "published" && !adminSession) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }
  return NextResponse.json(post);
}

export async function PATCH(request: Request, { params }: ParamsContext) {
  const adminSession = await requireAdminSession();
  if (!adminSession) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json();
  const parsed = updatePostSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const payload = parsed.data;
  const updateValues: Record<string, unknown> = {
    ...payload,
    updatedAt: new Date(),
  };

  if (payload.status === "published" && !payload.publishedAt) {
    updateValues.publishedAt = new Date();
  }
  if (payload.publishedAt) {
    updateValues.publishedAt = new Date(payload.publishedAt);
  }

  try {
    const [updatedPost] = await db.update(posts).set(updateValues).where(eq(posts.id, id)).returning();
    if (!updatedPost) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }
    return NextResponse.json(updatedPost);
  } catch {
    return NextResponse.json({ error: "Failed to update post. Check slug uniqueness." }, { status: 409 });
  }
}

export async function DELETE(_request: Request, { params }: ParamsContext) {
  const adminSession = await requireAdminSession();
  if (!adminSession) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const [deletedPost] = await db.delete(posts).where(eq(posts.id, id)).returning({ id: posts.id });
  if (!deletedPost) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}
