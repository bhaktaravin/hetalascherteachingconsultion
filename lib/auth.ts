import type { Session } from "next-auth";
import type { NextAuthOptions } from "next-auth";
import { getServerSession } from "next-auth";
import CognitoProvider from "next-auth/providers/cognito";

const splitAdminEmails = (raw: string | undefined) =>
  (raw ?? "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);

export const getAdminEmails = () => splitAdminEmails(process.env.ADMIN_EMAILS);

export const authOptions: NextAuthOptions = {
  providers: [
    CognitoProvider({
      clientId: process.env.COGNITO_CLIENT_ID ?? "",
      clientSecret: process.env.COGNITO_CLIENT_SECRET ?? "",
      issuer: process.env.COGNITO_ISSUER ?? "",
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user }) {
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
  return Boolean(email && getAdminEmails().includes(email));
};

export async function requireAdminSession() {
  const session = await getServerAuthSession();
  return isAdminSession(session) ? session : null;
}
