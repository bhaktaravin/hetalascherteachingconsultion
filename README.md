## Hetal Ascher Consulting Site

Next.js 16 marketing site with:
- public pages (`/`, `/about`, `/contact`; `/blog` temporarily redirects home)
- Neon Postgres-backed content (blog routes exist for admin; public `/blog` redirects home for now)
- AWS Cognito sign-in admin area for post management (`/admin`)

## Local Setup

1. Install dependencies:
```bash
npm install
```

2. Copy environment file:
```bash
cp .env.example .env.local
```

3. Fill these required variables:
- `DATABASE_URL` (Neon Postgres connection string)
- `NEXTAUTH_URL` (e.g. `http://localhost:3000`)
- `NEXTAUTH_SECRET`
- `COGNITO_CLIENT_ID`
- `COGNITO_CLIENT_SECRET`
- `COGNITO_ISSUER`
- `ADMIN_EMAILS` (comma-separated allowed editor emails)

Optional (recommended for launch):

- `NEXT_PUBLIC_BOOKING_URL` — public scheduling link (Calendly, Google Calendar appointment schedule, etc.). Must be a full `https://` URL. If unset, the home page shows a “Contact me” fallback instead of a booking button.
- `NEXT_PUBLIC_BOOKING_BUTTON_LABEL` — optional label for that button (default: `Schedule a consultation`).

Optional **EmailJS** (browser email to her inbox). When all three are set, the contact form still saves to Postgres first, then sends through EmailJS so she gets an email notification. Until these are set, only the database + `/admin` path runs.

- `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` — Account → API keys → **Public Key**
- `NEXT_PUBLIC_EMAILJS_SERVICE_ID` — Email Services → your service → **Service ID**
- `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` — Email Templates → your template → **Template ID**

In the EmailJS template body, you can use placeholders such as `{{from_name}}`, `{{first_name}}`, `{{last_name}}`, `{{email}}`, `{{reply_to}}`, `{{role_label}}`, `{{topic_label}}`, and `{{message}}` (and `{{role}}` / `{{topic}}` for the raw values if needed).

4. Generate and run DB migrations:
```bash
npm run db:generate
npm run db:migrate
```

5. Start the app:
```bash
npm run dev
```

## Blog Admin

- Visit `/login` and sign in with approved Cognito account.
- Visit `/admin` to create, edit, publish, or delete posts.
- Public blog readers only see posts with `status = "published"`.
- Contact form submissions are stored in Postgres and listed at the bottom of `/admin` under **Contact inquiries**.
- If EmailJS env vars are set, each successful submission also triggers an email through EmailJS (see optional env vars above).

The initial migration uses `CREATE TABLE IF NOT EXISTS` so it is safer if the `posts` table already existed before you adopted Drizzle migrations; apply it once with `npm run db:migrate` against your Neon database.

## Deployment Notes

See detailed setup in:
- `docs/aws-setup.md`
