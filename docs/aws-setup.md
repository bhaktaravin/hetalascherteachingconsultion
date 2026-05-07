# Neon + Cognito Auth Setup Runbook

This project now uses:
- Neon Postgres for blog storage
- Auth.js (NextAuth v4) + AWS Cognito for admin access

## 1) Neon database

1. Create a Neon project and database.
2. Copy the pooled connection string.
3. Set `DATABASE_URL` in your environment.
4. Run migrations:
   - `npm run db:generate`
   - `npm run db:migrate`

## 2) AWS Cognito credentials

1. Create a Cognito User Pool and App Client.
2. Configure hosted UI domain.
3. Set callback URL(s):
   - `http://localhost:3000/api/auth/callback/cognito` (local)
   - `https://your-domain.com/api/auth/callback/cognito` (production)
4. Set:
   - `COGNITO_CLIENT_ID`
   - `COGNITO_CLIENT_SECRET`
   - `COGNITO_ISSUER` (example: `https://cognito-idp.us-east-1.amazonaws.com/us-east-1_ABC123`)

## 3) Auth.js secrets and allowed editors

Set:
- `NEXTAUTH_URL` to your site URL
- `NEXTAUTH_SECRET` to a strong random value
- `ADMIN_EMAILS` to a comma-separated allowlist of editor emails

Only emails listed in `ADMIN_EMAILS` can access `/admin`.

## 4) Hosting on AWS

You can host Next.js on AWS using Amplify Hosting, App Runner, or ECS.
Regardless of platform:

1. Set all environment variables listed in `.env.example`.
2. Ensure outbound access to Neon from your runtime.
3. Confirm Cognito callback URL uses your production domain.
4. Test:
   - login at `/login`
   - admin create/edit/delete at `/admin`
   - published posts visible at `/blog`

## 5) Operational checklist

- Rotate Google secrets and `NEXTAUTH_SECRET` periodically.
- Restrict `ADMIN_EMAILS` to only trusted editors.
- Back up Neon database.
- Monitor API errors and failed logins in hosting logs.
