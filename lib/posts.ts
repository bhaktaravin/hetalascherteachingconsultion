import { desc, eq } from "drizzle-orm";

import { db } from "@/lib/db";
import { posts } from "@/lib/schema";

export async function getPublishedPosts() {
  return db
    .select()
    .from(posts)
    .where(eq(posts.status, "published"))
    .orderBy(desc(posts.featured), desc(posts.publishedAt), desc(posts.createdAt));
}

export async function getPublishedPostBySlug(slug: string) {
  const [post] = await db
    .select()
    .from(posts)
    .where(eq(posts.slug, slug))
    .limit(1);

  if (!post || post.status !== "published") {
    return null;
  }
  return post;
}
