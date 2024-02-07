import { TRPCError } from "@trpc/server";
import { and, eq } from "drizzle-orm";
import { z } from "zod";
import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { posts } from "~/server/db/schema";
import { attachAuthors } from "~/utils/data";
import { generateNanoId } from "~/utils/nanoid";
import { postsRatelimiter } from "~/utils/ratelimiters";

export const postRouter = createTRPCRouter({

  create: privateProcedure
    .input(z.object({
      content: z.string().trim().min(1).max(280),
    }))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.userId;

      const { success } = await postsRatelimiter.limit(userId);
      if (!success) throw new TRPCError({
        code: "TOO_MANY_REQUESTS",
        message: "You've reached your posting limit for the day!",
      });

      await ctx.db.insert(posts).values({
        id: generateNanoId(),
        userId,
        content: input.content.trim(),
      });
    }),

  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.query.posts
      .findMany({
        orderBy: (posts, { desc }) => [desc(posts.createdAt)],
        limit: 25,
      }).then(attachAuthors);
  }),

  getPostsAndReposts: publicProcedure
    .input(z.object({
      userId: z.string().optional(),
    }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.query.posts
        .findMany({
          where: (posts, { and, eq, or }) => input.userId
            ? and( eq(posts.userId, input.userId), or( eq(posts.type, "post"), eq(posts.type, "repost") ) )
            : or(eq(posts.type, "post"), eq(posts.type, "repost")),
          orderBy: (posts, { desc }) => [desc(posts.createdAt)],
          limit: 25,
        }).then(attachAuthors);
    }),

  getReplies: publicProcedure
    .input(z.object({
      userId: z.string().optional(),
    }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.query.posts
        .findMany({
          where: (posts, { and, eq }) => input.userId
            ? and( eq(posts.userId, input.userId), eq(posts.type, "reply") )
            : eq(posts.type, "reply"),
          orderBy: (posts, { desc }) => [desc(posts.createdAt)],
          limit: 25,
        }).then(attachAuthors);
    }),

  delete: privateProcedure
    .input(z.object({
      id: z.string().length(12),
    }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.delete(posts).where(and(
        eq(posts.id, input.id),
        eq(posts.userId, ctx.session.userId),
      ));
    }),

});
