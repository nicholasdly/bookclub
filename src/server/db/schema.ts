// https://orm.drizzle.team/docs/sql-schema-declaration

import { relations, sql } from "drizzle-orm";
import {
  index,
  mysqlEnum,
  mysqlTableCreator,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const mysqlTable = mysqlTableCreator((name) => `bookclub_${name}`);

export const users = mysqlTable(
  "users",
  {
    id: varchar("id", { length: 100 }).primaryKey(),
    username: varchar("username", { length: 64 }).notNull().unique(),
    email: varchar("email", { length: 320 }).notNull().unique(),
    bio: varchar("bio", { length: 160 }).notNull().default(""),
    firstName: varchar("firstName", { length: 50 }).notNull(),
    lastName: varchar("lastName", { length: 50 }).notNull(),
    imageUrl: varchar("imageUrl", { length: 256 }).notNull(),
    createdAt: timestamp("createdAt").default(sql`CURRENT_TIMESTAMP`).notNull(),
    type: mysqlEnum("type", ["user", "developer", "author"]).default("user").notNull(),
  },
  (user) => ({
    userIdIndex: index("userId_idx").on(user.id),
    usernameIndex: index("username_idx").on(user.username),
    typeIndex: index("type_idx").on(user.type),
  }),
);

export const posts = mysqlTable(
  "posts",
  {
    id: varchar("id", { length: 20 }).primaryKey(),
    userId: varchar("userId", { length: 100 }).notNull(),
    content: varchar("content", { length: 280 }).notNull(),
    createdAt: timestamp("createdAt").default(sql`CURRENT_TIMESTAMP`).notNull(),
  },
  (post) => ({
    userIdIndex: index("userId_idx").on(post.userId),
  }),
);

export const replies = mysqlTable(
  "replies",
  {
    id: varchar("id", { length: 20 }).primaryKey(),
    parentId: varchar("parentId", { length: 20 }),
    userId: varchar("userId", { length: 100 }).notNull(),
    content: varchar("content", { length: 280 }).notNull(),
    createdAt: timestamp("createdAt").default(sql`CURRENT_TIMESTAMP`).notNull(),
  },
  (post) => ({
    userIdIndex: index("userId_idx").on(post.userId),
    parentIdIndex: index("parentId_idx").on(post.parentId),
  }),
);

export const reposts = mysqlTable(
  "reposts",
  {
    id: varchar("id", { length: 20 }).primaryKey(),
    parentId: varchar("parentId", { length: 20 }),
    userId: varchar("userId", { length: 100 }).notNull(),
    createdAt: timestamp("createdAt").default(sql`CURRENT_TIMESTAMP`).notNull(),
  },
  (post) => ({
    userIdIndex: index("userId_idx").on(post.userId),
    parentIdIndex: index("parentId_idx").on(post.parentId),
  }),
);

export const likes = mysqlTable(
  "likes",
  {
    id: varchar("id", { length: 20 }).primaryKey(),
    userId: varchar("userId", { length: 100 }).notNull(),
    parentId: varchar("parentId", { length: 20 }).notNull(),
  },
  (like) => ({
    userIdIndex: index("userId_idx").on(like.userId),
    parentIdIndex: index("parentId_idx").on(like.parentId),
  }),
);

export const follows = mysqlTable(
  "follows",
  {
    id: varchar("id", { length: 20 }).primaryKey(),
    followerId: varchar("followerId", { length: 100 }).notNull(),
    followingId: varchar("followingId", { length: 100 }).notNull(),
  },
  (follow) => ({
    followerIdIndex: index("followerId_idx").on(follow.followerId),
    followingIdIndex: index("followingId_idx").on(follow.followingId),
  }),
);

export const userRelations = relations(users, ({ many }) => ({
  posts: many(posts),
  replies: many(replies),
  reposts: many(reposts),
  likes: many(likes),
  follower: many(follows, { relationName: "follower" }),
  following: many(follows, { relationName: "following" }),
}));

export const postRelations = relations(posts, ({ one }) => ({
  user: one(users, {
    fields: [posts.userId],
    references: [users.id],
  }),
}));

export const replyRelations = relations(replies, ({ one }) => ({
  user: one(users, {
    fields: [replies.userId],
    references: [users.id],
  }),
  parent: one(posts, {
    fields: [replies.parentId],
    references: [posts.id],
  }),
}));

export const repostRelations = relations(reposts, ({ one }) => ({
  user: one(users, {
    fields: [reposts.userId],
    references: [users.id],
  }),
  parent: one(posts, {
    fields: [reposts.parentId],
    references: [posts.id],
  }),
}));

export const likeRelations = relations(likes, ({ one }) => ({
  user: one(users, {
    fields: [likes.userId],
    references: [users.id],
  }),
}));

export const followRelations = relations(follows, ({ one }) => ({
  follower: one(users, {
    fields: [follows.followerId],
    references: [users.id],
    relationName: "follower",
  }),
  following: one(users, {
    fields: [follows.followingId],
    references: [users.id],
    relationName: "following",
  }),
}));
