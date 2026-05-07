import type { Session } from "next-auth";
import type { NextAuthOptions } from "next-auth";
import { getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

const splitAdminEmails = (raw: string | undefined) =>
  (raw ?? "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);

export const getAdminEmails = () => splitAdminEmails(process.env.ADMIN_EMAILS);
export const getAdminUsername = () => (process.env.ADMIN_USERNAME ?? "").trim().toLowerCase();

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const configuredUsername = getAdminUsername();
        const configuredPassword = process.env.ADMIN_PASSWORD ?? "";
        const username = credentials?.username?.trim().toLowerCase() ?? "";
        const password = credentials?.password ?? "";

        if (!configuredUsername || !configuredPassword) {
          return null;
        }
        if (username !== configuredUsername || password !== configuredPassword) {
          return null;
        }

        return {
          id: "admin-credentials-user",
          email: configuredUsername,
          name: "Admin",
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "credentials") {
        return true;
      }
      const adminEmails = getAdminEmails();
      const userEmail = user.email?.toLowerCase();
      return Boolean(userEmail && adminEmails.includes(userEmail));
    },
    async session({ session, token }) {
      if (session.user && token.email) {
        session.user.email = token.email;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

export const getServerAuthSession = () => getServerSession(authOptions);

export const isAdminSession = (session: Session | null) => {
  const email = session?.user?.email?.toLowerCase();
  if (!email) return false;
  return getAdminEmails().includes(email) || email === getAdminUsername();
};

export async function requireAdminSession() {
  const session = await getServerAuthSession();
  return isAdminSession(session) ? session : null;
}
