import { z } from "zod";
import { createTRPCRouter, privateProcedure } from "../trpc";
import ratelimit from "~/utils/ratelimit";
import { TRPCError } from "@trpc/server";
import { and, eq } from "drizzle-orm";
import { generateNanoId } from "~/utils/nanoid";
import { reposts } from "~/server/db/schema";

export const repostRouter = createTRPCRouter({

  /**
   * Creates a new repost of a specified post associated with the current authenticated user.
   */
  create: privateProcedure
    .input(z.object({
      parentId: z.string(),
    }))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.userId;

      const { success } = await ratelimit.reposts.create.limit(userId);
      if (!success) throw new TRPCError({
        code: "TOO_MANY_REQUESTS",
        message: "You've reached your repost creation limit for the day!",
      });

      await ctx.db.insert(reposts).values({
        id: generateNanoId(),
        parentId: input.parentId,
        userId,
      });
    }),

  /**
   * Deletes a specified repost associated with the current authenticated user.
   */
  delete: privateProcedure
    .input(z.object({
      id: z.string().length(12),
    }))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.userId;

      const { success } = await ratelimit.reposts.delete.limit(userId);
      if (!success) throw new TRPCError({
        code: "TOO_MANY_REQUESTS",
        message: "You've reached your repost removal limit for the day!",
      });

      await ctx.db.delete(reposts).where(and(
        eq(reposts.id, input.id),
        eq(reposts.userId, userId),
      ));
    }),

});
