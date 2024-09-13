import NextAuth from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { Options as HashingOptions, verify } from "@node-rs/argon2";
import db from "@/server/db";
import { accounts, users } from "@/server/db/schema";
import Credentials from "next-auth/providers/credentials";
import { eq, or } from "drizzle-orm";

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
    newUser: "/auth/register",
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

        if (!user || !isPasswordMatch) {
          throw new Error("Invalid credentials!");
        }

        return user;
      },
    }),
  ],
});
