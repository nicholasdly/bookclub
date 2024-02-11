import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const posts = {

  create: new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(50, "1 d"),
    analytics: true,
  }),

  delete: new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(50, "1 d"),
    analytics: true,
  }),

};

const replies = {

  create: new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(50, "1 d"),
    analytics: true,
  }),

  delete: new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(50, "1 d"),
    analytics: true,
  }),

};

const reposts = {

  create: new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(50, "1 d"),
    analytics: true,
  }),

  delete: new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(50, "1 d"),
    analytics: true,
  }),

};

const ratelimit = {
  posts,
  replies,
  reposts
};

export default ratelimit;
