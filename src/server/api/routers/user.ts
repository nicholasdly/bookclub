import {
  createTRPCRouter,
  publicProcedure,
} from "@/server/api/trpc";
import * as schema from "@/server/db/schema";
import ratelimit from "@/lib/ratelimit";
import { TRPCError } from "@trpc/server";
import { headers } from "next/headers";
import { eq } from "drizzle-orm";
import { z } from "zod";

export const userRouter = createTRPCRouter({

  checkUsername: publicProcedure
    .input(z.object({
      username: z.string().min(1).max(15).refine((value) => /^[a-z0-9_]+$/.test(value)),
    }))
    .mutation(async ({ ctx, input }) => {
      const ip = headers().get("x-forwarded-for") ?? "unknown";

      const { success } = await ratelimit.user.checkUsername.limit(ip);
      if (!success) throw new TRPCError({ code: "TOO_MANY_REQUESTS" });

      const existingUser = await ctx.db.query.users.findFirst({
        where: eq(schema.users.username, input.username),
      });
      
      return !existingUser;
    }),

});
