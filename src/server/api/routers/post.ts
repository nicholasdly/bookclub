import { TRPCError } from "@trpc/server";
import { z } from "zod";
import {
  createTRPCRouter,
  privateProcedure,
} from "~/server/api/trpc";
import { posts } from "~/server/db/schema";
import { attachAuthors } from "~/utils/data";
import { generateNanoId } from "~/utils/nanoid";
import { postsRatelimiter } from "~/utils/ratelimiters";

export const postRouter = createTRPCRouter({
  create: privateProcedure
    .input(
      z.object({
        content: z.string().trim().min(1).max(280),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.userId!;

      const { success } = await postsRatelimiter.limit(userId);
      if (!success)
        throw new TRPCError({
          code: "TOO_MANY_REQUESTS",
          message: "You've reached your posting limit for the day!",
        });

      await ctx.db.insert(posts).values({
        id: generateNanoId(),
        userId,
        content: input.content.trim(),
      });
    }),

  getAll: privateProcedure.query(async ({ ctx }) => {
    return await ctx.db.query.posts
      .findMany({
        orderBy: (posts, { desc }) => [desc(posts.createdAt)],
        limit: 25,
      })
      .then(attachAuthors);
  }),
});
