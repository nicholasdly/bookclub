import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
} from "@/server/api/trpc";
import * as schema from "@/server/db/schema";
import ratelimit from "@/lib/ratelimit";
import { TRPCError } from "@trpc/server";
import { and, eq } from "drizzle-orm";
import posthog from "@/analytics/server";

export const postRouter = createTRPCRouter({

  create: protectedProcedure
    .input(z.object({
      content: z.string().trim().min(1),
    }))
    .mutation(async ({ ctx, input }) => {
      const authorId = ctx.session.user.id;

      const { success } = await ratelimit.post.create.limit(authorId);
      if (!success) throw new TRPCError({ code: "TOO_MANY_REQUESTS" });

      const results = await ctx.db
        .insert(schema.posts)
        .values({
          content: input.content,
          authorId,
        })
        .returning({ id: schema.posts.id });

      return results.map((post) => post.id); 
    }),

  delete: protectedProcedure
    .input(z.object({
      id: z.string().trim().min(1),
    }))
    .mutation(async ({ ctx, input }) => {
      const authorId = ctx.session.user.id;

      const { success } = await ratelimit.post.delete.limit(authorId);
      if (!success) throw new TRPCError({ code: "TOO_MANY_REQUESTS" });

      const post = await ctx.db.query.posts.findFirst({
        where: (posts, { eq }) => eq(posts.id, input.id),
      });

      if (!post) throw new TRPCError({ code: "NOT_FOUND" });
      if (post.authorId != authorId) throw new TRPCError({ code: "UNAUTHORIZED" });

      const results = await ctx.db
        .delete(schema.posts)
        .where(and(
          eq(schema.posts.id, input.id),
          eq(schema.posts.authorId, authorId),
        ))
        .returning({ id: schema.posts.id });

      return results.map((post) => post.id);
    }),

});
