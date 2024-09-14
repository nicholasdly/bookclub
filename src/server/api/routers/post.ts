import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import * as schema from "@/server/db/schema";

export const postRouter = createTRPCRouter({

  create: protectedProcedure
    .input(z.object({
      content: z.string().trim().min(1),
    }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(schema.posts).values({
        content: input.content,
        authorId: ctx.session.user.id,
      });
    }),

  getAll: publicProcedure
    .query(async ({ ctx }) => {
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
        limit: 100,
      });
    }),

});
