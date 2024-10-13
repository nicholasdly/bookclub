import { pgTable, primaryKey } from "drizzle-orm/pg-core";
import { users } from "./user";
import type { AdapterAccountType } from "next-auth/adapters";
import { relations } from "drizzle-orm";

export const accounts = pgTable(
  "account",
  (t) => ({
    userId: t
      .uuid()
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: t.text().$type<AdapterAccountType>().notNull(),
    provider: t.text().notNull(),
    providerAccountId: t.text().notNull(),
    refresh_token: t.text(),
    access_token: t.text(),
    expires_at: t.integer(),
    token_type: t.text(),
    scope: t.text(),
    id_token: t.text(),
    session_state: t.text(),
  }),
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  }),
);

export const accountRelations = relations(accounts, ({ one }) => ({
  user: one(users, {
    fields: [accounts.userId],
    references: [users.id],
  }),
}));
