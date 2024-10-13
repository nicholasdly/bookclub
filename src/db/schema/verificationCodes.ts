import { pgTable } from "drizzle-orm/pg-core";
import { users } from "./user";
import { relations } from "drizzle-orm";

export const verificationCodes = pgTable("verification_code", (t) => ({
  id: t.uuid().primaryKey().defaultRandom(),
  userId: t
    .uuid()
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  code: t.text().notNull(),
  expiresAt: t.timestamp().notNull(),
}));

export const verificationCodeRelations = relations(
  verificationCodes,
  ({ one }) => ({
    user: one(users, {
      fields: [verificationCodes.userId],
      references: [users.id],
    }),
  }),
);
