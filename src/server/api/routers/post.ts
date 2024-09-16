import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
} from "@/server/api/trpc";
import * as schema from "@/server/db/schema";
import ratelimit from "@/lib/ratelimit";
import { TRPCError } from "@trpc/server";

export const postRouter = createTRPCRouter({

  create: protectedProcedure
    .input(z.object({
      content: z.string().trim().min(1),
    }))
    .mutation(async ({ ctx, input }) => {
      const authorId = ctx.session.user.id;

      const { success } = await ratelimit.post.create.limit(authorId);
      if (!success) throw new TRPCError({ code: "TOO_MANY_REQUESTS" });

      await ctx.db.insert(schema.posts).values({
        content: input.content,
        authorId,
      });
    }),

});
