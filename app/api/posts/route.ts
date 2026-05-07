import { desc, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

import { requireAdminSession } from "@/lib/auth";
import { getDb } from "@/lib/db";
import { posts } from "@/lib/schema";
import { createPostSchema } from "@/lib/validators/post";

export async function GET(request: Request) {
  const db = getDb();
  const url = new URL(request.url);
  const status = url.searchParams.get("status");
  const slug = url.searchParams.get("slug");
  const adminSession = await requireAdminSession();

  if (slug) {
    const [post] = await db.select().from(posts).where(eq(posts.slug, slug)).limit(1);
    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }
    if (post.status !== "published" && !adminSession) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }
    return NextResponse.json(post);
  }

  if (status === "all" && adminSession) {
    const allPosts = await db.select().from(posts).orderBy(desc(posts.createdAt));
    return NextResponse.json(allPosts);
  }

  const publishedPosts = await db
    .select()
    .from(posts)
    .where(eq(posts.status, "published"))
    .orderBy(desc(posts.publishedAt), desc(posts.createdAt));

  return NextResponse.json(publishedPosts);
}

export async function POST(request: Request) {
  const db = getDb();
  const adminSession = await requireAdminSession();
  if (!adminSession) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const parsed = createPostSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const payload = parsed.data;
  const publishDate =
    payload.publishedAt != null
      ? new Date(payload.publishedAt)
      : payload.status === "published"
        ? new Date()
        : null;

  try {
    const [createdPost] = await db
      .insert(posts)
      .values({
        ...payload,
        publishedAt: publishDate,
      })
      .returning();

    return NextResponse.json(createdPost, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create post. Check slug uniqueness." }, { status: 409 });
  }
}
