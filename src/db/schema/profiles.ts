import { relations } from "drizzle-orm";
import { pgTable, uniqueIndex } from "drizzle-orm/pg-core";

import { lower, randomAvatar } from "../helpers";
import { users } from "./users";

export const profiles = pgTable(
  "profiles",
  (t) => ({
    id: t
      .uuid()
      .primaryKey()
      .references(() => users.id, { onDelete: "cascade", onUpdate: "cascade" }),
    username: t.text().unique().notNull(),
    name: t.text().notNull(),
    image: t
      .text()
      .notNull()
      .$defaultFn(() => randomAvatar()),
  }),
  (user) => ({
    uniqueUsernameIndex: uniqueIndex("profiles_lowercase_username_unique").on(
      lower(user.username),
    ),
  }),
);

export const profileRelations = relations(profiles, ({ one }) => ({
  user: one(users, {
    fields: [profiles.id],
    references: [users.id],
  }),
}));
