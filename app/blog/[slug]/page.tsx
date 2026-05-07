import { notFound } from "next/navigation";

import Navbar from "@/app/components/Navbar";
import SiteFooter from "@/app/components/SiteFooter";
import { getPublishedPostBySlug } from "@/lib/posts";

type PageProps = {
  params: Promise<{ slug: string }>;
};

const formatDate = (value: Date | string | null) => {
  if (!value) return "Draft";
  const date = new Date(value);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      <section className="px-4 py-14 sm:px-6 sm:py-20">
        <article className="mx-auto max-w-4xl rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500 sm:text-sm">Blog</p>
          <h1 className="mt-3 font-serif text-3xl font-bold text-[var(--color-brand)] sm:text-5xl">{post.title}</h1>
          <p className="mt-3 text-sm text-gray-600">
            {post.authorName} • {formatDate(post.publishedAt)}
          </p>
          <div className="mt-6 space-y-4 whitespace-pre-wrap leading-relaxed text-gray-800">{post.content}</div>
        </article>
      </section>
      <SiteFooter />
    </main>
  );
}
