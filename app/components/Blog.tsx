import Link from "next/link";

import { getPublishedPosts } from "@/lib/posts";

const formatDate = (value: Date | string | null) => {
  if (!value) return "Draft";
  const date = new Date(value);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const getReadTime = (content: string) => {
  const words = content.trim().split(/\s+/).length;
  return `${Math.max(1, Math.round(words / 220))} min read`;
};

export default async function Blog() {
  let posts = [] as Awaited<ReturnType<typeof getPublishedPosts>>;
  try {
    posts = await getPublishedPosts();
  } catch {
    posts = [];
  }
  const [featuredPost, ...otherPosts] = posts;

  return (
    <section className="bg-gray-50 px-4 py-14 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500 sm:text-sm">Blog</p>
        <h1 className="mt-3 font-serif text-3xl font-bold text-[var(--color-brand)] sm:text-5xl">
          Resources for Educators
        </h1>
        <p className="mt-4 max-w-3xl text-gray-700">
          Research-informed reflections and practical strategies to support multilingual learners and inclusive
          literacy instruction.
        </p>

        {!featuredPost ? (
          <div className="mt-8 rounded-2xl border border-dashed border-gray-300 bg-white p-8 text-center text-gray-600">
            No published posts yet. Sign in to `/admin` to publish your first article.
          </div>
        ) : (
          <article className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-500">Featured Post</p>
            <h2 className="mt-3 font-serif text-2xl font-semibold text-[var(--color-brand)] sm:text-3xl">
              {featuredPost.title}
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              {featuredPost.authorName} • {formatDate(featuredPost.publishedAt)} • {getReadTime(featuredPost.content)}
            </p>
            <p className="mt-4 text-gray-700">{featuredPost.excerpt}</p>
            <Link
              href={`/blog/${featuredPost.slug}`}
              className="mt-5 inline-flex rounded-lg bg-[var(--color-brand)] px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-90"
            >
              Read Article
            </Link>
          </article>
        )}

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {otherPosts.map((post) => (
            <article key={post.title} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="font-serif text-xl font-semibold text-[var(--color-brand)]">{post.title}</h3>
              <p className="mt-2 text-sm text-gray-600">
                {post.authorName} • {formatDate(post.publishedAt)} • {getReadTime(post.content)}
              </p>
              <p className="mt-3 text-gray-700">{post.excerpt}</p>
              <Link
                href={`/blog/${post.slug}`}
                className="mt-4 inline-flex text-sm font-semibold text-[var(--color-brand)] underline underline-offset-4"
              >
                Read Article
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
