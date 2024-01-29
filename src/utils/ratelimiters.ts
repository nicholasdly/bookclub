import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

/** An Upstash ratelimiter meant for posts, that allows 100 requests per 1 day. */
export const postsRatelimiter = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(100, "1 d"),
  analytics: true,
});

/** An Upstash ratelimiter meant for the antisleep CRON job, that allows 1 requests per 1 day. */
export const antisleepRatelimiter = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(1, "1 d"),
  analytics: true,
});
