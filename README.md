## Hetal Ascher Consulting Site

Next.js 16 marketing site with:
- public pages (`/`, `/about`, `/blog`, `/contact`)
- Neon Postgres-backed blog content
- Google sign-in admin area for post management (`/admin`)

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
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `ADMIN_EMAILS` (comma-separated allowed editor emails)

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

- Visit `/login` and sign in with approved Google account.
- Visit `/admin` to create, edit, publish, or delete posts.
- Public blog readers only see posts with `status = "published"`.

## Deployment Notes

See detailed setup in:
- `docs/aws-setup.md`
