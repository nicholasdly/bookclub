// Example model schema from the Drizzle docs
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
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    type: mysqlEnum("type", ["user", "developer", "author"])
      .default("user")
      .notNull(),
  },
  (user) => ({
    userIdIndex: index("userId_idx").on(user.id),
    usernameIndex: index("username_idx").on(user.username),
    typeIndex: index("type_idx").on(user.type),
  }),
);

// export const follows = mysqlTable(
//   "follows",
//   {
//     id: varchar("id", { length: 12 }).primaryKey(),
//     followerId: varchar("id", { length: 100 }).notNull(),
//     followingId: varchar("id", { length: 100 }).notNull(),
//   },
//   (follow) => ({
//     followerIdIndex: index("followerId_idx").on(follow.followerId),
//     followingIdIndex: index("followingId_idx").on(follow.followingId),
//   }),
// )

export const posts = mysqlTable(
  "posts",
  {
    id: varchar("id", { length: 12 }).primaryKey(),
    parentId: varchar("parentId", { length: 12 }),
    userId: varchar("userId", { length: 100 }).notNull(),
    content: varchar("content", { length: 280 }).notNull(),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    type: mysqlEnum("type", ["post", "reply", "repost"])
      .default("post")
      .notNull(),
  },
  (post) => ({
    userIdIndex: index("userId_idx").on(post.userId),
    parentIdIndex: index("parentId_idx").on(post.parentId),
    typeIndex: index("type_idx").on(post.type),
  }),
);

// export const likes = mysqlTable(
//   "likes",
//   {
//     id: varchar("id", { length: 12 }).primaryKey(),
//     userId: varchar("userId", { length: 100 }).notNull(),
//     postId: varchar("postId", { length: 12 }).notNull(),
//   },
//   (like) => ({
//     userIdIndex: index("userId_idx").on(like.userId),
//     postIdIndex: index("postId_idx").on(like.postId),
//   }),
// )

export const usersRelations = relations(users, ({ many }) => ({
  posts: many(posts),
  // followers: many(follows),
  // following: many(follows),
}));

export const postRelations = relations(posts, ({ one }) => ({
  user: one(users, {
    fields: [posts.userId],
    references: [users.id],
  }),
}));

// export const postsRelations = relations(posts, ({ many }) => ({
//   likes: many(likes),
// }));
