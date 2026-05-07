import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const callbackUrl = url.searchParams.get("callbackUrl") ?? "/admin";
  const signInUrl = new URL("/api/auth/signin/google", url.origin);
  signInUrl.searchParams.set("callbackUrl", callbackUrl);
  return NextResponse.redirect(signInUrl);
}
