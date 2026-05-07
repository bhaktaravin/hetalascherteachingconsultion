"use client";

import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-gray-50 px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">Admin Access</p>
        <h1 className="mt-3 font-serif text-3xl font-bold text-[var(--color-brand)]">Sign in to manage posts</h1>
        <p className="mt-3 text-gray-700">
          Use your approved Cognito account to access the blog admin dashboard.
        </p>
        <button
          type="button"
          onClick={() => signIn("cognito", { callbackUrl: "/admin" })}
          className="mt-6 inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-[var(--color-brand)] px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90"
        >
          Continue with Sign In
        </button>
      </div>
    </main>
  );
}
