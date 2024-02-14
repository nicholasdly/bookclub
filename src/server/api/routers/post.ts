import { TRPCError } from "@trpc/server";
import { and, eq } from "drizzle-orm";
import { z } from "zod";
import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";
import { posts } from "~/server/db/schema";
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

});
