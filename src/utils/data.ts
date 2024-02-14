import { count, eq } from "drizzle-orm";
import { likes, replies, reposts } from "~/server/db/schema";
import type { Context } from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { clerkClient } from "@clerk/nextjs";

/**
 * Wrapper for the Clerk `getUser` method, which returns a `User` object if a user with an `id` equal to `userId` exists, otherwise throws a `TRPCError`.
 * @param userId The `id` property of a `User`
 * @returns Clerk `User` object
 */
export async function getAuthor(userId: string) {
  try {
    const user = await clerkClient.users.getUser(userId);
    return user;
  } catch (error) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: `There does not exist a user with id: ${userId}`,
    });
  }
}

/**
 * Returns the number of likes a specified item of `id` equal to `itemId` has.
 * @param ctx tRPC API router procedure context
 * @param itemId The `id` property of a `Post` or `Reply`
 * @returns `number`
 */
export async function getLikeCount(ctx: Context, itemId: string) {
  const results = await ctx.db
    .select({ value: count() })
    .from(likes)
    .where(eq(likes.parentId, itemId));

  if (results[0]?.value == null) throw new TRPCError({
    code: "INTERNAL_SERVER_ERROR",
    message: `Failed to retrieve like count for item with id: ${itemId}`,
  });

  return results[0].value;
}

/**
 * Returns the number of replies a specified item of `id` equal to `itemId` has.
 * @param ctx tRPC API router procedure context
 * @param itemId The `id` property of a `Post` or `Reply`
 * @returns `number`
 */
export async function getReplyCount(ctx: Context, itemId: string) {
  const results = await ctx.db
    .select({ value: count() })
    .from(replies)
    .where(eq(replies.parentId, itemId));

  if (results[0]?.value == null) throw new TRPCError({
    code: "INTERNAL_SERVER_ERROR",
    message: `Failed to retrieve reply count for item with id: ${itemId}`,
  });

  return results[0].value;
}

/**
 * Returns the number of reposts a specified item of `id` equal to `itemId` has.
 * @param ctx tRPC API router procedure context
 * @param itemId The `id` property of a `Post` or `Reply`
 * @returns `number`
 */
export async function getRepostCount(ctx: Context, itemId: string) {
  const results = await ctx.db
    .select({ value: count() })
    .from(reposts)
    .where(eq(reposts.parentId, itemId));

  if (results[0]?.value == null) throw new TRPCError({
    code: "INTERNAL_SERVER_ERROR",
    message: `Failed to retrieve repost count for item with id: ${itemId}`,
  });

  return results[0].value;
}
