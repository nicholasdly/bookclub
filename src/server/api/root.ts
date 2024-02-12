import { postRouter } from "~/server/api/routers/post";
import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { userRouter } from "./routers/user";
import { feedRouter } from "./routers/feed";
import { replyRouter } from "./routers/reply";
import { repostRouter } from "./routers/repost";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  users: userRouter,
  feed: feedRouter,
  posts: postRouter,
  replies: replyRouter,
  reposts: repostRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

// export function to create callers for API in testing
export const createCaller = createCallerFactory(appRouter);
