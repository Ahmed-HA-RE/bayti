import { Ratelimit } from '@upstash/ratelimit';
import { redis } from './redis';
const rateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, '60s'),
  analytics: true,
});

export default rateLimit;
