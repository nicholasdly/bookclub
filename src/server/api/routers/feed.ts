import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { posts } from "~/server/db/schema";
import { desc, lte } from "drizzle-orm";
import { clerkClient } from "@clerk/nextjs";
import { TRPCError } from "@trpc/server";
import { getLikeCount, getReplyCount, getRepostCount } from "~/utils/data";

export const feedRouter = createTRPCRouter({

  /**
   * Retrieves recent posts, replies, and reposts using cursor-based pagination.
   */
  getAll: publicProcedure
    .input(z.object({
      cursor: z.date().nullish(),
      limit: z.number().int().default(25),
    }))
    .query(async ({ ctx, input }) => {

      const query = ctx.db
        .select()
        .from(posts)
        .orderBy(desc(posts.createdAt))
        .limit(input.limit + 1);

      // TODO: Fetch recent replies
      // TODO: Fetch recent reposts

      const items = input.cursor
        ? await query.where(lte(posts.createdAt, input.cursor))
        : await query;

      // Update cursor location to last item retrieved from page.
      let cursor: typeof input.cursor = undefined;
      if (items.length > input.limit) {
        const next = items.pop();
        cursor = next!.createdAt;
      }

      const authors = await clerkClient.users.getUserList({
        userId: items.map((item) => item.userId),
        limit: input.limit,
      });
    
      // Append related information to each item.
      const results = items.map(async (item) => {
        const author = authors.find((user) => user.id === item.userId);

        if (!author) throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Invalid post discovered due to nonexistent author.",
        });

        const [replyCount, likeCount, repostCount] = await Promise.all([
          getReplyCount(ctx, item.id),
          getLikeCount(ctx, item.id),
          getRepostCount(ctx, item.id),
        ]);

        return {
          ...item,
          author: {
            username: author.username!,
            imageUrl: author.imageUrl,
            name: `${author.firstName} ${author.lastName}`,
          },
          replies: replyCount,
          likes: likeCount,
          reposts: repostCount,
        };
      });

      return { items: await Promise.all(results), cursor };
    }),

});
