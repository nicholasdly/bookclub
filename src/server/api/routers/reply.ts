import { z } from "zod";
import { createTRPCRouter, privateProcedure } from "../trpc";
import ratelimit from "~/utils/ratelimit";
import { TRPCError } from "@trpc/server";
import { and, eq } from "drizzle-orm";
import { generateNanoId } from "~/utils/nanoid";
import { replies } from "~/server/db/schema";

export const replyRouter = createTRPCRouter({

  /**
   * Creates a new reply to a specified post associated with the current authenticated user.
   */
  create: privateProcedure
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

      await ctx.db.insert(replies).values({
        id: generateNanoId(),
        parentId: input.parentId,
        userId,
        content: input.content.trim(),
      });
    }),

  /**
   * Deletes a specified reply associated with the current authenticated user.
   */
  delete: privateProcedure
    .input(z.object({
      id: z.string(),
    }))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.userId;

      const { success } = await ratelimit.replies.delete.limit(userId);
      if (!success) throw new TRPCError({
        code: "TOO_MANY_REQUESTS",
        message: "You've reached your reply deleting limit for the day!",
      });

      await ctx.db.delete(replies).where(and(
        eq(replies.id, input.id),
        eq(replies.userId, userId),
      ));
    }),

});
