import Link from "next/link";
import { desc, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import Navbar from "@/app/components/Navbar";
import SiteFooter from "@/app/components/SiteFooter";
import { isAdminSession, requireAdminSession } from "@/lib/auth";
import { getDb } from "@/lib/db";
import { posts } from "@/lib/schema";

const formatDate = (value: Date | string | null) => {
  if (!value) return "Not published";
  return new Date(value).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export default async function AdminPage() {
  const db = getDb();
  const session = await requireAdminSession();
  if (!isAdminSession(session)) {
    redirect("/login");
  }

  const allPosts = await db.select().from(posts).orderBy(desc(posts.updatedAt), desc(posts.createdAt));

  async function deletePostAction(formData: FormData) {
    "use server";
    const adminSession = await requireAdminSession();
    if (!isAdminSession(adminSession)) {
      redirect("/login");
    }
    const id = formData.get("id");
    if (typeof id === "string" && id) {
      await db.delete(posts).where(eq(posts.id, id));
      revalidatePath("/admin");
      revalidatePath("/blog");
    }
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      <section className="px-4 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-6xl rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500 sm:text-sm">Admin</p>
              <h1 className="mt-2 font-serif text-3xl font-bold text-[var(--color-brand)] sm:text-4xl">
                Manage Blog Posts
              </h1>
            </div>
            <Link
              href="/admin/new"
              className="inline-flex min-h-11 items-center rounded-lg bg-[var(--color-brand)] px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
            >
              New Post
            </Link>
          </div>

          <div className="mt-8 overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 text-left text-sm">
              <thead className="text-gray-500">
                <tr>
                  <th className="px-3 py-3 font-semibold">Title</th>
                  <th className="px-3 py-3 font-semibold">Status</th>
                  <th className="px-3 py-3 font-semibold">Published</th>
                  <th className="px-3 py-3 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-800">
                {allPosts.map((post) => (
                  <tr key={post.id}>
                    <td className="px-3 py-3">
                      <p className="font-medium">{post.title}</p>
                      <p className="text-xs text-gray-500">{post.slug}</p>
                    </td>
                    <td className="px-3 py-3 capitalize">{post.status}</td>
                    <td className="px-3 py-3">{formatDate(post.publishedAt)}</td>
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-3">
                        <Link href={`/admin/${post.id}`} className="text-[var(--color-brand)] underline underline-offset-4">
                          Edit
                        </Link>
                        <form action={deletePostAction}>
                          <input type="hidden" name="id" value={post.id} />
                          <button type="submit" className="text-red-700 underline underline-offset-4">
                            Delete
                          </button>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
