import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

type Duration = Parameters<typeof Ratelimit.slidingWindow>[1];

const createRatelimiter = (tokens: number, window: Duration) => {
  return new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(tokens, window),
    analytics: true,
  });
};

const posts = {
  create: createRatelimiter(50, "1 d"),
  delete: createRatelimiter(50, "1 d"),
};

const replies = {
  create: createRatelimiter(50, "1 d"),
  delete: createRatelimiter(50, "1 d"),
};

const reposts = {
  create: createRatelimiter(50, "1 d"),
  delete: createRatelimiter(50, "1 d"),
};

const ratelimit = {
  posts,
  replies,
  reposts
};

export default ratelimit;
