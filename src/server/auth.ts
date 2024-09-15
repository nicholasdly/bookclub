import { DefaultJWT } from "next-auth/jwt";
import NextAuth, { DefaultSession } from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { Options as HashingOptions, verify } from "@node-rs/argon2";
import db from "@/server/db";
import { accounts, users } from "@/server/db/schema";
import Credentials from "next-auth/providers/credentials";
import { eq, or } from "drizzle-orm";

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
  session: { strategy: "jwt" },
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

      token.username = user.username;

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
        identifier: {},
        password: {},
      },
      authorize: async (credentials) => {
        const identifier = credentials.identifier as string;
        const password = credentials.password as string;

        const user = await db.query.users.findFirst({
          where: or(
            eq(users.username, identifier),
            eq(users.email, identifier),
          ),
        });

        const isPasswordMatch = user
          ? await verify(user.passwordHash, password, hashingOptions)
          : false;

        // Throws the same error for both "missing user" and "invalid password"
        // to prevent malicious actors from easily discovering genuine
        // usernames via error message or error timing.
        if (!user || !isPasswordMatch) return null;

        return user;
      },
    }),
  ],
});
