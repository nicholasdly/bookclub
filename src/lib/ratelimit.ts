import { Redis } from "@upstash/redis";
import { Ratelimit, Duration } from "@upstash/ratelimit";

const redis = Redis.fromEnv();

/**
 * Helper function for creating a new `Ratelimit` instance using the sliding
 * window algorithm, powered by Upstash Redis.
 * @param requests The number of requests allowed in the defined `window`.
 * @param window The window of time before the request count is reset.
 * @returns `Ratelimit`
 */
function createRatelimit(requests: number, window: Duration) {
  return new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(requests, window),
    analytics: true,
  });
}

const ratelimit = {
  auth: {
    login: createRatelimit(10, "10 m"),
    logout: createRatelimit(20, "1 m"),
    register: createRatelimit(5, "15 m"),
  },
  post: {
    create: createRatelimit(50, "1 d"),
  },
  user: {
    checkUsername: createRatelimit(100, "1 d"),
  },
  feed: {
    getPublic: createRatelimit(1000, "1 d"),
  },
};

export default ratelimit;
