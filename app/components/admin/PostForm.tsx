"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type PostFormValues = {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  authorName: string;
  status: "draft" | "published";
  featured: boolean;
  publishedAt?: string | null;
};

type PostFormProps = {
  mode: "create" | "edit";
  initialValues?: PostFormValues;
};

const emptyValues: PostFormValues = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  authorName: "Hetal Ascher",
  status: "draft",
  featured: false,
  publishedAt: null,
};

const formatDatetimeLocal = (value?: string | null) => {
  if (!value) return "";
  const date = new Date(value);
  return new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
};

export default function PostForm({ mode, initialValues }: PostFormProps) {
  const router = useRouter();
  const [values, setValues] = useState<PostFormValues>({
    ...emptyValues,
    ...initialValues,
    publishedAt: formatDatetimeLocal(initialValues?.publishedAt),
  });
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateField = <K extends keyof PostFormValues>(field: K, value: PostFormValues[K]) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSaving(true);
    setError(null);

    const payload = {
      ...values,
      publishedAt: values.publishedAt ? new Date(values.publishedAt).toISOString() : null,
    };

    const endpoint = mode === "create" ? "/api/posts" : `/api/posts/${values.id}`;
    const method = mode === "create" ? "POST" : "PATCH";

    try {
      const response = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const body = (await response.json().catch(() => null)) as { error?: unknown } | null;
        throw new Error(typeof body?.error === "string" ? body.error : "Failed to save post.");
      }

      router.push("/admin");
      router.refresh();
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : "Failed to save post.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-2 text-sm">
          <span className="font-medium text-gray-700">Title</span>
          <input
            value={values.title}
            onChange={(e) => updateField("title", e.target.value)}
            className="min-h-11 w-full rounded-lg border border-gray-300 px-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[var(--color-brand)]"
            required
          />
        </label>
        <label className="space-y-2 text-sm">
          <span className="font-medium text-gray-700">Slug</span>
          <input
            value={values.slug}
            onChange={(e) => updateField("slug", e.target.value.toLowerCase().replace(/\s+/g, "-"))}
            className="min-h-11 w-full rounded-lg border border-gray-300 px-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[var(--color-brand)]"
            required
          />
        </label>
      </div>

      <label className="space-y-2 text-sm">
        <span className="font-medium text-gray-700">Excerpt</span>
        <textarea
          value={values.excerpt}
          onChange={(e) => updateField("excerpt", e.target.value)}
          rows={3}
          className="w-full rounded-lg border border-gray-300 p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[var(--color-brand)]"
          required
        />
      </label>

      <label className="space-y-2 text-sm">
        <span className="font-medium text-gray-700">Content</span>
        <textarea
          value={values.content}
          onChange={(e) => updateField("content", e.target.value)}
          rows={14}
          className="w-full rounded-lg border border-gray-300 p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[var(--color-brand)]"
          required
        />
      </label>

      <div className="grid gap-4 sm:grid-cols-3">
        <label className="space-y-2 text-sm">
          <span className="font-medium text-gray-700">Author</span>
          <input
            value={values.authorName}
            onChange={(e) => updateField("authorName", e.target.value)}
            className="min-h-11 w-full rounded-lg border border-gray-300 px-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[var(--color-brand)]"
            required
          />
        </label>
        <label className="space-y-2 text-sm">
          <span className="font-medium text-gray-700">Status</span>
          <select
            value={values.status}
            onChange={(e) => updateField("status", e.target.value as "draft" | "published")}
            className="min-h-11 w-full rounded-lg border border-gray-300 px-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[var(--color-brand)]"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </label>
        <label className="space-y-2 text-sm">
          <span className="font-medium text-gray-700">Publish Date</span>
          <input
            type="datetime-local"
            value={values.publishedAt ?? ""}
            onChange={(e) => updateField("publishedAt", e.target.value)}
            className="min-h-11 w-full rounded-lg border border-gray-300 px-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[var(--color-brand)]"
          />
        </label>
      </div>

      <label className="inline-flex items-center gap-2 text-sm text-gray-700">
        <input
          type="checkbox"
          checked={values.featured}
          onChange={(e) => updateField("featured", e.target.checked)}
          className="h-4 w-4 rounded border-gray-300 text-[var(--color-brand)] focus:ring-[var(--color-brand)]"
        />
        Mark as featured post
      </label>

      {error && <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}

      <button
        type="submit"
        disabled={isSaving}
        className="inline-flex min-h-11 items-center justify-center rounded-lg bg-[var(--color-brand)] px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSaving ? "Saving..." : mode === "create" ? "Create Post" : "Save Changes"}
      </button>
    </form>
  );
}
