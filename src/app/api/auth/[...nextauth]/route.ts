import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { compare } from "bcrypt";
import { db } from "@/db";
import { users } from "@/db/schema/schema";
import { eq } from "drizzle-orm";
import { RequestInternal, User } from "next-auth";

const handler = NextAuth({
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
    // signOut: "/user",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
    CredentialsProvider({
      credentials: { name: {}, email: {}, password: {} },
      async authorize(
        credentials: Record<"name" | "email" | "password", string> | undefined,
        req: Pick<RequestInternal, "body" | "query" | "headers" | "method">
      ): Promise<User | null> {
        const res = (
          await db
            .select()
            .from(users)
            .where(
              credentials?.email !== undefined
                ? eq(users.email, credentials?.email)
                : eq(users.email, "")
            )
        )[0];

        const passwordCorrect = await compare(
          credentials?.password!,
          res.password!
        );

        if (passwordCorrect) {
          return { ...res };
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true;
    },
  },
});

export { handler as GET, handler as POST };
