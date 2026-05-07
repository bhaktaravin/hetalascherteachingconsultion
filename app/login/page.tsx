"use client";

import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCredentialsLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const result = await signIn("credentials", {
      username,
      password,
      redirect: false,
      callbackUrl: "/admin",
    });

    setIsSubmitting(false);
    if (result?.ok) {
      window.location.href = "/admin";
      return;
    }
    setError("Invalid username or password.");
  };

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">Admin Access</p>
        <h1 className="mt-3 font-serif text-3xl font-bold text-[var(--color-brand)]">Sign in to manage posts</h1>
        <p className="mt-3 text-gray-700">
          Use your approved Google account or admin credentials to access the blog admin dashboard.
        </p>
        <form onSubmit={handleCredentialsLogin} className="mt-6 space-y-3">
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="min-h-11 w-full rounded-lg border border-gray-300 px-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[var(--color-brand)]"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="min-h-11 w-full rounded-lg border border-gray-300 px-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[var(--color-brand)]"
            required
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-[var(--color-brand)] px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-70"
          >
            {isSubmitting ? "Signing in..." : "Sign in with Credentials"}
          </button>
        </form>

        {error && <p className="mt-3 text-sm text-red-700">{error}</p>}

        <div className="my-5 h-px bg-gray-200" />

        <button
          type="button"
          onClick={() => signIn("google", { callbackUrl: "/admin" })}
          className="inline-flex min-h-11 w-full items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-semibold text-gray-900 transition hover:bg-gray-100"
        >
          Continue with Google
        </button>
      </div>
    </main>
  );
}
