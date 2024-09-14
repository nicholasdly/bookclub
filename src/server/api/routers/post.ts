import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import * as schema from "@/server/db/schema";
import ratelimit from "@/lib/ratelimit";
import { TRPCError } from "@trpc/server";
import { headers } from "next/headers";

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

  getAll: publicProcedure
    .query(async ({ ctx }) => {
      const ip = headers().get("x-forwarded-for") ?? "unknown";

      const { success } = await ratelimit.post.getAll.limit(ip);
      if (!success) throw new TRPCError({ code: "TOO_MANY_REQUESTS" });

      return await ctx.db.query.posts.findMany({
        with: {
          author: {
            columns: {
              id: true,
              name: true,
              username: true,
              image: true,
            }
          }
        },
        orderBy: (posts, { desc }) => [desc(posts.createdAt)],
        limit: 50,
      });
    }),

});
