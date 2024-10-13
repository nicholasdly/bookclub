import "server-only";

import NextAuth, { DefaultSession } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import db from "@/db";
import { accounts, users } from "@/db/schema";
import { Options as HashingOptions, verify } from "@node-rs/argon2";
import { eq, or } from "drizzle-orm";
import Credentials from "next-auth/providers/credentials";
import loginFormSchema from "@/lib/zod/login-form-schema";

// Uses TypeScript Module Augmentation to extend the JWT type.
// https://authjs.dev/getting-started/typescript#module-augmentation
declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    username?: string | undefined;
  }
}

// Uses TypeScript Module Augmentation to extend the Session type.
// https://authjs.dev/getting-started/typescript#module-augmentation
declare module "next-auth" {
  interface Session {
    user: {
      name: string;
      username: string;
      email: string;
      image: string;
      id: string;
    } & DefaultSession["user"];
  }
}

// Recommended minimum hashing parameters.
export const hashingOptions: HashingOptions = {
  memoryCost: 19456,
  timeCost: 2,
  outputLen: 32,
  parallelism: 1,
};

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
  }),
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 7, // 1 week
  },
  pages: {
    signIn: "/auth/login",
    newUser: "/home",
  },
  callbacks: {
    async jwt({ token }) {
      if (!token.sub) return token;

      const user = await db.query.users.findFirst({
        where: eq(users.id, token.sub),
      });

      if (!user) return token;

      // Append client-side user data to the JWT.
      token.username = user.username;

      // TODO: Refresh JWT expiration date.

      return token;
    },
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.username && session.user) {
        session.user.username = token.username;
      }

      return session;
    },
  },
  providers: [
    Credentials({
      credentials: {
        identifier: { label: "identifier" },
        password: { label: "password", type: "password" },
      },
      authorize: async (credentials) => {
        const fields = loginFormSchema.safeParse(credentials);
        if (!fields.success) return null;

        const { identifier, password } = fields.data;

        const user = await db.query.users.findFirst({
          where: or(
            eq(users.username, identifier),
            eq(users.email, identifier),
          ),
        });

        const isEmailVerified = user ? !!user.emailVerified : false;
        const isPasswordMatch = user
          ? await verify(user.passwordHash, password, hashingOptions)
          : false;

        // Throws the same error no matter the cause to prevent malicious
        // actors from easily discovering genuine usernames via error message
        // or error timing.
        if (!user || !isEmailVerified || !isPasswordMatch) return null;

        return user;
      },
    }),
  ],
});
