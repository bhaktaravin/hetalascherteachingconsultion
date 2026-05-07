import { redirect } from "next/navigation";

import Navbar from "@/app/components/Navbar";
import SiteFooter from "@/app/components/SiteFooter";
import PostForm from "@/app/components/admin/PostForm";
import { isAdminSession, requireAdminSession } from "@/lib/auth";

export default async function NewPostPage() {
  const session = await requireAdminSession();
  if (!isAdminSession(session)) {
    redirect("/login");
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      <section className="px-4 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-4xl rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500 sm:text-sm">Admin</p>
          <h1 className="mt-2 font-serif text-3xl font-bold text-[var(--color-brand)] sm:text-4xl">Create Post</h1>
          <div className="mt-6">
            <PostForm mode="create" />
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
