import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
} from "@/server/api/trpc";
import * as schema from "@/server/db/schema";
import ratelimit from "@/lib/ratelimit";
import { TRPCError } from "@trpc/server";
import { headers } from "next/headers";
import { desc, eq, lte } from "drizzle-orm";

export const feedRouter = createTRPCRouter({

  getPublic: publicProcedure
    .input(z.object({
      cursor: z.date().nullish(),
      limit: z.number().int().min(1).max(100).default(25),
    }))
    .query(async ({ ctx, input }) => {
      const ip = headers().get("x-forwarded-for") ?? "unknown";

      const { success } = await ratelimit.feed.getPublic.limit(ip);
      if (!success) throw new TRPCError({ code: "TOO_MANY_REQUESTS" });

      const query = ctx.db
        .select({
          id: schema.posts.id,
          createdAt: schema.posts.createdAt,
          content: schema.posts.content,
          author: {
            id: schema.users.id,
            name: schema.users.name,
            username: schema.users.username,
            image: schema.users.image,
          },
        })
        .from(schema.posts)
        .innerJoin(schema.users, eq(schema.posts.authorId, schema.users.id))
        .orderBy(desc(schema.posts.createdAt))
        .limit(input.limit + 1);

      const posts = input.cursor
        ? await query.where(lte(schema.posts.createdAt, input.cursor))
        : await query;

      let cursor: typeof input.cursor;
      if (posts.length > input.limit) {
        const next = posts.pop();
        cursor = next?.createdAt;
      }

      return { posts, cursor };
    })

});
