import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  get: publicProcedure
    .input(z.object({
      username: z.string().trim().min(1),
    }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.query.users.findFirst({
        where: (users, { eq }) => eq(users.username, input.username),
      });
    }),
});
