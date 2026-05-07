import { desc, eq } from "drizzle-orm";

import { getDb } from "@/lib/db";
import { posts } from "@/lib/schema";

export async function getPublishedPosts() {
  try {
    const db = getDb();
    return db
      .select()
      .from(posts)
      .where(eq(posts.status, "published"))
      .orderBy(desc(posts.featured), desc(posts.publishedAt), desc(posts.createdAt));
  } catch {
    return [];
  }
}

export async function getPublishedPostBySlug(slug: string) {
  try {
    const db = getDb();
    const [post] = await db
      .select()
      .from(posts)
      .where(eq(posts.slug, slug))
      .limit(1);

    if (!post || post.status !== "published") {
      return null;
    }
    return post;
  } catch {
    return null;
  }
}
