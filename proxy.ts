import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const parseAdminEmails = (raw: string | undefined) =>
  (raw ?? "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);

const getAdminUsername = () => (process.env.ADMIN_USERNAME ?? "").trim().toLowerCase();

export async function proxy(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
  const adminEmails = parseAdminEmails(process.env.ADMIN_EMAILS);
  const email = token?.email?.toLowerCase();

  const allowed = Boolean(email && (adminEmails.includes(email) || email === getAdminUsername()));
  if (!allowed) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
