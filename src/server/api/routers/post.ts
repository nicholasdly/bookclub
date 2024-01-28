import { z } from "zod";
import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { posts } from "~/server/db/schema";
import { attachAuthors } from "~/utils/helpers";
import { generateNanoId } from "~/utils/nanoid";

export const postRouter = createTRPCRouter({
  create: privateProcedure
    .input(
      z.object({
        content: z.string().trim().min(1).max(280),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(posts).values({
        id: generateNanoId(),
        userId: ctx.session.userId!,
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
