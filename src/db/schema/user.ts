import { pgTable, uniqueIndex } from "drizzle-orm/pg-core";
import { lower, randomAvatar } from "../helpers";
import { accounts } from "./account";
import { verificationCodes } from "./verificationCodes";
import { relations } from "drizzle-orm";

export const users = pgTable(
  "user",
  (t) => ({
    id: t.uuid().primaryKey().defaultRandom(),
    name: t.text().notNull(),
    username: t.text().unique().notNull(),
    email: t.text().unique().notNull(),
    passwordHash: t.text().notNull(),
    emailVerified: t.timestamp(),
    image: t
      .text()
      .notNull()
      .$defaultFn(() => randomAvatar()),
    createdAt: t.timestamp().notNull().defaultNow(),
  }),
  (user) => ({
    uniqueEmailIndex: uniqueIndex("user_lowercase_email_unique").on(
      lower(user.email),
    ),
    uniqueUsernameIndex: uniqueIndex("user_lowercase_username_unique").on(
      lower(user.username),
    ),
  }),
);

export const userRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
  verificationCodes: many(verificationCodes),
}));
