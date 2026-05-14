"use client";

import emailjs from "@emailjs/browser";
import { useState } from "react";

import { getEmailJsConfig, isEmailJsConfigured } from "@/lib/emailjsContact";
import { contactRoleSchema, contactTopicSchema } from "@/lib/validators/contact";
import type { z } from "zod";

type ContactRole = z.infer<typeof contactRoleSchema>;
type ContactTopic = z.infer<typeof contactTopicSchema>;

const roleOptions: { value: ContactRole; label: string }[] = [
  { value: "teacher", label: "Teacher" },
  { value: "instructional_coach", label: "Instructional coach" },
  { value: "administrator", label: "School or district leader" },
  { value: "parent", label: "Parent or caregiver" },
  { value: "other", label: "Other" },
];

const topicOptions: { value: ContactTopic; label: string }[] = [
  { value: "instructional_coaching", label: "Instructional coaching" },
  { value: "professional_learning", label: "Professional learning / PD" },
  { value: "curriculum_assessment", label: "Curriculum and assessment" },
  { value: "multilingual_learners", label: "Multilingual learners" },
  { value: "leadership_systems", label: "Leadership and systems" },
  { value: "other", label: "Something else" },
];

const inputClass =
  "min-h-11 w-full rounded-lg border border-gray-300 p-3 text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[var(--color-brand)]";

export default function ContactForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<ContactRole>("teacher");
  const [topic, setTopic] = useState<ContactTopic>("instructional_coaching");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(e: { preventDefault(): void }) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage(null);

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        role,
        topic,
        message,
        website,
      }),
    });

    if (res.ok) {
      if (res.status === 201 && isEmailJsConfigured()) {
        const roleLabel = roleOptions.find((r) => r.value === role)?.label ?? role;
        const topicLabel = topicOptions.find((t) => t.value === topic)?.label ?? topic;
        const { publicKey, serviceId, templateId } = getEmailJsConfig();
        try {
          await emailjs.send(
            serviceId,
            templateId,
            {
              from_name: `${firstName} ${lastName}`.trim(),
              first_name: firstName,
              last_name: lastName,
              reply_to: email,
              email,
              role,
              role_label: roleLabel,
              topic,
              topic_label: topicLabel,
              message,
            },
            { publicKey },
          );
        } catch (emailErr) {
          console.error("EmailJS send failed", emailErr);
        }
      }

      setStatus("success");
      setFirstName("");
      setLastName("");
      setEmail("");
      setRole("teacher");
      setTopic("instructional_coaching");
      setMessage("");
      setWebsite("");
      return;
    }

    let detail = "Something went wrong. Please try again.";
    try {
      const data = (await res.json()) as { error?: { message?: string; path?: (string | number)[] }[] };
      const first = data.error?.[0]?.message;
      if (first) detail = first;
    } catch {
      /* use default */
    }
    setErrorMessage(detail);
    setStatus("error");
  }

  return (
    <section className="px-4 py-12 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-5xl rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-10">
        <div className="mb-12 text-center">
          <p className="text-sm tracking-widest text-gray-500 uppercase">Get in Touch</p>

          <h1 className="mt-3 font-serif text-3xl font-bold text-[var(--color-brand)] sm:text-5xl">Contact Me</h1>

          <p className="mx-auto mt-4 max-w-xl text-gray-600">
            I’m here to answer your questions and help you create a plan that works for you.
          </p>
        </div>

        {status === "success" ? (
          <output
            className="mx-auto block max-w-3xl rounded-lg border border-green-200 bg-green-50 p-6 text-center text-green-900"
            aria-live="polite"
          >
            <p className="font-medium">Thank you — your message was sent.</p>
            <p className="mt-2 text-sm text-green-800">I’ll get back to you as soon as I can.</p>
          </output>
        ) : (
          <form className="relative mx-auto max-w-3xl space-y-5" onSubmit={handleSubmit} noValidate>
            <div className="pointer-events-none absolute left-[-9999px] top-0 h-px w-px overflow-hidden" aria-hidden>
              <label htmlFor="contact-website">Website</label>
              <input
                id="contact-website"
                name="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={website}
                onChange={(ev) => setWebsite(ev.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label htmlFor="contact-first" className="mb-1 block text-sm font-medium text-gray-700">
                  First name
                </label>
                <input
                  id="contact-first"
                  name="firstName"
                  required
                  autoComplete="given-name"
                  placeholder="First name"
                  className={inputClass}
                  value={firstName}
                  onChange={(ev) => setFirstName(ev.target.value)}
                />
              </div>
              <div>
                <label htmlFor="contact-last" className="mb-1 block text-sm font-medium text-gray-700">
                  Last name
                </label>
                <input
                  id="contact-last"
                  name="lastName"
                  required
                  autoComplete="family-name"
                  placeholder="Last name"
                  className={inputClass}
                  value={lastName}
                  onChange={(ev) => setLastName(ev.target.value)}
                />
              </div>
            </div>

            <div>
              <label htmlFor="contact-email" className="mb-1 block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="Email address"
                className={inputClass}
                value={email}
                onChange={(ev) => setEmail(ev.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label htmlFor="contact-role" className="mb-1 block text-sm font-medium text-gray-700">
                  Your role
                </label>
                <select
                  id="contact-role"
                  name="role"
                  className={inputClass}
                  value={role}
                  onChange={(ev) => setRole(ev.target.value as ContactRole)}
                >
                  {roleOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="contact-topic" className="mb-1 block text-sm font-medium text-gray-700">
                  Topic
                </label>
                <select
                  id="contact-topic"
                  name="topic"
                  className={inputClass}
                  value={topic}
                  onChange={(ev) => setTopic(ev.target.value as ContactTopic)}
                >
                  {topicOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="contact-message" className="mb-1 block text-sm font-medium text-gray-700">
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                required
                rows={6}
                placeholder="How can I help?"
                className={inputClass}
                value={message}
                onChange={(ev) => setMessage(ev.target.value)}
              />
            </div>

            {status === "error" && errorMessage ? (
              <p className="text-sm text-red-700" role="alert">
                {errorMessage}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={status === "submitting"}
              className="min-h-11 w-full rounded-lg bg-[var(--color-brand)] py-3 font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === "submitting" ? "Sending…" : "Send message"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
