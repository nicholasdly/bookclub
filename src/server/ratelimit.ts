import "server-only";

import { env } from "@/env";
import { Duration, Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: env.UPSTASH_REDIS_REST_URL,
  token: env.UPSTASH_REDIS_REST_TOKEN,
});

/**
 * Helper function for creating a new `Ratelimit` instance using the sliding
 * window algorithm, powered by Upstash Redis.
 * @param requests The number of requests allowed in the defined `window`.
 * @param window The window of time before the request count is reset.
 * @returns `Ratelimit` instance
 * @see https://upstash.com/docs/redis/sdks/ratelimit-ts/algorithms#sliding-window
 */
function createRatelimit(requests: number, window: Duration) {
  const isProduction = env.NODE_ENV === "production";

  return new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(
      isProduction ? requests : requests * 100,
      window,
    ),
    analytics: true,
  });
}

/**
 * Various `Ratelimit` instances used for rate limiting API requests, organized
 * by endpoint and server action. Each instance is configured with a sliding
 * window algorithm, powered by Upstash Redis.
 * @see https://upstash.com/docs/redis/sdks/ratelimit-ts/overview#upstash-rate-limit
 */
export const ratelimits = {
  auth: {
    login: createRatelimit(100, "1 d"),
    logout: createRatelimit(100, "1 d"),
    register: createRatelimit(5, "1 d"),
    verify: createRatelimit(25, "1 d"),
  },
};
