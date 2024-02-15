import { clerkClient } from "@clerk/nextjs";
import { TRPCError } from "@trpc/server";
import { and, desc, eq, lte } from "drizzle-orm";
import { z } from "zod";
import { createTRPCRouter, privateProcedure, publicProcedure } from "~/server/api/trpc";
import { posts } from "~/server/db/schema";
import { getAuthor, getLikeCount, getPreview, getReplyCount, getRepostCount } from "~/utils/data";
import { generateNanoId } from "~/utils/nanoid";
import ratelimit from "~/utils/ratelimit";

export const postRouter = createTRPCRouter({

  /**
   * Creates a new post associated with the current authenticated user.
   */
  create: privateProcedure
    .input(z.object({
      content: z.string().trim().min(1).max(280),
    }))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.userId;

      const { success } = await ratelimit.posts.create.limit(userId);
      if (!success) throw new TRPCError({
        code: "TOO_MANY_REQUESTS",
        message: "You've reached your post creation limit for the day!",
      });

      await ctx.db.insert(posts).values({
        id: generateNanoId(),
        userId,
        content: input.content.trim(),
      });
    }),
  
  /**
   * Creates a new reply to a specified post associated with the current authenticated user.
   */
  reply: privateProcedure
    .input(z.object({
      parentId: z.string(),
      content: z.string().trim().min(1).max(280),
    }))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.userId;

      const { success } = await ratelimit.replies.create.limit(userId);
      if (!success) throw new TRPCError({
        code: "TOO_MANY_REQUESTS",
        message: "You've reached your reply creation limit for the day!",
      });

      await ctx.db.insert(posts).values({
        id: generateNanoId(),
        parentId: input.parentId,
        userId,
        content: input.content.trim(),
        type: "reply",
      });
    }),

  /**
   * Deletes a specified post associated with the current authenticated user.
   */
  delete: privateProcedure
    .input(z.object({
      id: z.string(),
    }))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.userId;

      const { success } = await ratelimit.posts.delete.limit(userId);
      if (!success) throw new TRPCError({
        code: "TOO_MANY_REQUESTS",
        message: "You've reached your post deleting limit for the day!",
      });

      await ctx.db.delete(posts).where(and(
        eq(posts.id, input.id),
        eq(posts.userId, userId),
      ));
    }),

    /**
     * Retrieves a specified post including its author data, parent post data
     * (if it exists), and reply, like, and repost count.
     */
    get: publicProcedure
      .input(z.object({
        id: z.string(),
      }))
      .query(async ({ ctx, input }) => {

        const post = await ctx.db.query.posts.findFirst({
          where: (posts, { eq }) => eq(posts.id, input.id),
        });

        if (!post) return undefined;

        const [author, parent, replyCount, likeCount, repostCount] = await Promise.all([
          getAuthor(post.userId),
          getPreview(post.parentId),
          getReplyCount(post.id),
          getLikeCount(post.id),
          getRepostCount(post.id),
        ]);

        return {
          ...post,
          author: {
            username: author.username!,
            imageUrl: author.imageUrl,
            name: `${author.firstName} ${author.lastName}`,
          },
          parent,
          replies: replyCount,
          likes: likeCount,
          reposts: repostCount,
        };
      }),

  /**
   * Retrieves replies for a specific post using cursor-based pagination.
   */
  getReplies: publicProcedure
    .input(z.object({
      postId: z.string(),
      cursor: z.date().nullish(),
      limit: z.number().int().default(25),
    }))
    .query(async ({ ctx, input }) => {
      
      const query = ctx.db
        .select()
        .from(posts)
        .orderBy(desc(posts.createdAt))
        .limit(input.limit + 1);

      const _posts = input.cursor
        ? await query.where(and(
            eq(posts.parentId, input.postId),
            lte(posts.createdAt, input.cursor),
            eq(posts.type, "reply"),
          ))
        : await query.where(eq(posts.parentId, input.postId));

      // Update cursor location to last post retrieved from page.
      let cursor: typeof input.cursor = undefined;
      if (_posts.length > input.limit) {
        const next = _posts.pop();
        cursor = next!.createdAt;
      }

      const authors = await clerkClient.users.getUserList({
        userId: _posts.map((post) => post.userId),
        limit: input.limit,
      });
    
      // Append related information to each post.
      const results = _posts.map(async (post) => {
        const author = authors.find((user) => user.id === post.userId);

        if (!author) throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Invalid post discovered due to nonexistent author.",
        });

        const [replyCount, likeCount, repostCount] = await Promise.all([
          getReplyCount(post.id),
          getLikeCount(post.id),
          getRepostCount(post.id),
        ]);

        return {
          ...post,
          author: {
            username: author.username!,
            imageUrl: author.imageUrl,
            name: `${author.firstName} ${author.lastName}`,
          },
          replies: replyCount,
          likes: likeCount,
          reposts: repostCount,
        };
      });

      return { posts: await Promise.all(results), cursor };
    }),

});
