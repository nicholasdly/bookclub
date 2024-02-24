import { count, eq } from "drizzle-orm";
import { likes, posts, reposts } from "~/server/db/schema";
import { TRPCError } from "@trpc/server";
import { clerkClient } from "@clerk/nextjs";
import { db } from "~/server/db";

/**
 * Wrapper for the Clerk `getUser` method, which returns a `User` object if a
 * user with an `id` equal to `userId` exists, otherwise throws a `TRPCError`.
 * @param userId The `id` property of a `User`
 * @returns Clerk `User` object
 */
export async function getAuthor(userId: string) {
  try {
    return await clerkClient.users.getUser(userId);
  } catch (error) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: `There does not exist a user with id: ${userId}`,
    });
  }
}

/**
 * Retrieves a specified post's basic information and author's basic
 * information, otherwise returns `undefined` if a post with id equal to
 * `postId` does not exist.
 * @param postId The `id` property of a post
 * @returns `Post`
 */
export async function getPreview(postId: string | null) {
  if (!postId) return undefined;

  const post = await db.query.posts.findFirst({
    columns: {
      id: true,
      userId: true,
      content: true,
      createdAt: true,
    },
    where: (posts, { eq }) => eq(posts.id, postId),
  });

  if (!post) return undefined;

  const author = await getAuthor(post.userId);

  return {
    ...post,
    author: {
      username: author.username!,
      imageUrl: author.imageUrl,
      name: `${author.firstName} ${author.lastName}`,
    },
  };
}

/**
 * Returns the number of likes a specified item of `id` equal to `itemId` has.
 * @param itemId The `id` property of a post
 * @returns `number`
 */
export async function getLikeCount(itemId: string) {
  const [results] = await db
    .select({ value: count() })
    .from(likes)
    .where(eq(likes.parentId, itemId));

  if (results?.value == null) throw new TRPCError({
    code: "INTERNAL_SERVER_ERROR",
    message: `Failed to retrieve like count for item with id: ${itemId}`,
  });

  return results.value;
}

/**
 * Returns the number of replies a specified item of `id` equal to `itemId`
 * has.
 * @param itemId The `id` property of a post
 * @returns `number`
 */
export async function getReplyCount(itemId: string) {
  const [results] = await db
    .select({ value: count() })
    .from(posts)
    .where(eq(posts.parentId, itemId));

  if (results?.value == null) throw new TRPCError({
    code: "INTERNAL_SERVER_ERROR",
    message: `Failed to retrieve reply count for item with id: ${itemId}`,
  });

  return results.value;
}

/**
 * Returns the number of reposts a specified item of `id` equal to `itemId`
 * has.
 * @param itemId The `id` property of a post
 * @returns `number`
 */
export async function getRepostCount(itemId: string) {
  const [results] = await db
    .select({ value: count() })
    .from(reposts)
    .where(eq(reposts.parentId, itemId));

  if (results?.value == null) throw new TRPCError({
    code: "INTERNAL_SERVER_ERROR",
    message: `Failed to retrieve repost count for item with id: ${itemId}`,
  });

  return results.value;
}
