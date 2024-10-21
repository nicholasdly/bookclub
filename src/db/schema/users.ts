import { relations } from "drizzle-orm";
import { pgSchema } from "drizzle-orm/pg-core";

import { profiles } from "./profiles";

const auth = pgSchema("auth");

/**
 * Since the default `users` table of Supabase is part of the `auth` schema,
 * we specify a custom table which describes the `users` table in our database.
 *
 * This table should NEVER be included in migrations, and should only be used
 * for the purpose of querying and declaring SQL relationships.
 */
export const users = auth.table("users", (t) => ({
  id: t.uuid().primaryKey(),
  email: t.varchar(),
  createdAt: t.timestamp({ withTimezone: true }),
}));

export const userRelations = relations(users, ({ one }) => ({
  profile: one(profiles),
}));
