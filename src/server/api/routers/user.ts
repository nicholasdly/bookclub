import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { posts, users } from "~/server/db/schema";
import { and, desc, eq, lte } from "drizzle-orm";
import { clerkClient } from "@clerk/nextjs";
import { TRPCError } from "@trpc/server";
import { getLikeCount, getPreview, getReplyCount, getRepostCount } from "~/utils/data";

export const userRouter = createTRPCRouter({

  /**
   * Retrieves a specific user's profile information given their username.
   */
  getProfile: publicProcedure
    .input(z.object({
      username: z.string().trim().min(1),
    }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.query.users.findFirst({
        where: (users, { eq }) => eq(users.username, input.username),
      });
    }),

  /**
   * Retrieves a specific user's name given their username.
   */
  getName: publicProcedure
    .input(z.object({
      username: z.string().trim().min(1),
    }))
    .query(async ({ ctx, input }) => {
      const [user] = await ctx.db
        .select({
          username: users.username,
          firstName: users.firstName,
          lastName: users.lastName,
        })
        .from(users)
        .where(eq(users.username, input.username))
        .limit(1);
      
        return user;
    }),
    
  /**
   * Retrieves posts from a specified user using cursor-based pagination.
   */
  getPosts: publicProcedure
    .input(z.object({
      userId: z.string(),
      cursor: z.date().nullish(),
      limit: z.number().int().default(25),
    }))
    .query(async ({ ctx, input }) => {
      
      const query = ctx.db
        .select()
        .from(posts)
        .orderBy(desc(posts.createdAt))
        .limit(input.limit + 1);

      const items = input.cursor
        ? await query.where(and(
            eq(posts.userId, input.userId),
            lte(posts.createdAt, input.cursor),
            eq(posts.type, "post"),
          ))
        : await query.where(eq(posts.userId, input.userId));

      // Update cursor location to last item retrieved from page.
      let cursor: typeof input.cursor = undefined;
      if (items.length > input.limit) {
        const next = items.pop();
        cursor = next!.createdAt;
      }

      const author = await clerkClient.users.getUser(input.userId);

      if (!author) throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Invalid post discovered due to nonexistent author.",
      });
    
      // Append related information to each item.
      const results = items.map(async (item) => {

        const [parent, replyCount, likeCount, repostCount] = await Promise.all([
          getPreview(item.parentId),
          getReplyCount(item.id),
          getLikeCount(item.id),
          getRepostCount(item.id),
        ]);

        return {
          ...item,
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
      });

      return { items: await Promise.all(results), cursor };
    }),

  /**
   * Retrieves replies from a specific user using cursor-based pagination.
   */
  getReplies: publicProcedure
    .input(z.object({
      userId: z.string(),
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
            eq(posts.userId, input.userId),
            eq(posts.type, "reply"),
            lte(posts.createdAt, input.cursor),
          ))
        : await query.where(and(
            eq(posts.userId, input.userId),
            eq(posts.type, "reply"),
          ));

      // Update cursor location to last post retrieved from page.
      let cursor: typeof input.cursor = undefined;
      if (_posts.length > input.limit) {
        const next = _posts.pop();
        cursor = next!.createdAt;
      }
      
      const author = await clerkClient.users.getUser(input.userId);

      if (!author) throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Invalid post discovered due to nonexistent author.",
      });

      // Append related information to each post.
      const results = _posts.map(async (post) => {

        const [parent, replyCount, likeCount, repostCount] = await Promise.all([
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
      });

      return { posts: await Promise.all(results), cursor };
    }),

});
