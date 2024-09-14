import { randomImage } from "@/lib/utils";
import { relations } from "drizzle-orm";
import {
  boolean,
  timestamp,
  pgTable,
  text,
  primaryKey,
  integer,
  uuid,
  AnyPgColumn,
} from "drizzle-orm/pg-core";
import { AdapterAccountType } from "next-auth/adapters";

export const users = pgTable("user", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  username: text("username").unique().notNull(),
  email: text("email").unique().notNull(),
  passwordHash: text("passwordHash").notNull(),
  emailVerified: timestamp("emailVerified"),
  image: text("image")
    .notNull()
    .$defaultFn(() => randomImage()),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
});

export const accounts = pgTable(
  "account",
  {
    userId: uuid("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  }),
);

export const authenticators = pgTable(
  "authenticator",
  {
    credentialID: text("credentialID").notNull().unique(),
    userId: uuid("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    providerAccountId: text("providerAccountId").notNull(),
    credentialPublicKey: text("credentialPublicKey").notNull(),
    counter: integer("counter").notNull(),
    credentialDeviceType: text("credentialDeviceType").notNull(),
    credentialBackedUp: boolean("credentialBackedUp").notNull(),
    transports: text("transports"),
  },
  (authenticator) => ({
    compositePK: primaryKey({
      columns: [authenticator.userId, authenticator.credentialID],
    }),
  }),
);

export const posts = pgTable("posts", {
  id: uuid("id").primaryKey().defaultRandom(),
  authorId: uuid("authorId")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
});

export const likes = pgTable("likes", {
  id: uuid("id").primaryKey().defaultRandom(),
  postId: uuid("postId")
    .references(() => posts.id, { onDelete: "cascade" })
    .notNull(),
  userId: uuid("userId")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
});

export const replies = pgTable("replies", {
  id: uuid("id").primaryKey().defaultRandom(),
  postId: uuid("postId").references((): AnyPgColumn => posts.id, {
    onUpdate: "cascade",
    onDelete: "set null",
  }),
  authorId: uuid("authorId")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
});

export const reposts = pgTable("reposts", {
  id: uuid("id").primaryKey().defaultRandom(),
  postId: uuid("postId")
    .references(() => posts.id, { onDelete: "cascade" })
    .notNull(),
  userId: uuid("userId")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
});

export const bookmarks = pgTable("bookmarks", {
  id: uuid("id").primaryKey().defaultRandom(),
  postId: uuid("postId")
    .references(() => posts.id, { onDelete: "cascade" })
    .notNull(),
  userId: uuid("userId")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
});

export const usersRelations = relations(users, ({ many }) => ({
  posts: many(posts),
  likes: many(likes),
  reposts: many(reposts),
  bookmarks: many(bookmarks),
}));

export const postsRelations = relations(posts, ({ one, many }) => ({
  author: one(users, {
    fields: [posts.authorId],
    references: [users.id],
  }),
  replies: many(replies),
  likes: many(likes),
  reposts: many(reposts),
  bookmarks: many(bookmarks),
}));

export const likesRelations = relations(likes, ({ one }) => ({
  post: one(posts, {
    fields: [likes.postId],
    references: [posts.id],
  }),
  user: one(users, {
    fields: [likes.userId],
    references: [users.id],
  }),
}));

export const repliesRelations = relations(replies, ({ one }) => ({
  post: one(posts, {
    fields: [replies.postId],
    references: [posts.id],
  }),
}));

export const repostsRelations = relations(reposts, ({ one }) => ({
  post: one(posts, {
    fields: [reposts.postId],
    references: [posts.id],
  }),
  user: one(users, {
    fields: [reposts.userId],
    references: [users.id],
  }),
}));

export const bookmarksRelations = relations(bookmarks, ({ one }) => ({
  post: one(posts, {
    fields: [bookmarks.postId],
    references: [posts.id],
  }),
  user: one(users, {
    fields: [bookmarks.userId],
    references: [users.id],
  }),
}));
