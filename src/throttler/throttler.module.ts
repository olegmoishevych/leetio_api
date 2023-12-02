import { Module, Global } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';

/**
 * GlobalThrottlerModule.
 * This module integrates and configures multiple throttling (rate-limiting) configurations for the application.
 * It uses ThrottlerModule from the @nestjs/throttler package to provide flexible rate-limiting options.
 * Different configurations ('short', 'medium', 'long') allow applying varied rate limits based on the use case.
 * This is a global module, making these configurations available across the entire application.
 *
 * Configurations:
 * - 'short': Limits to 3 requests per 1 second.
 * - 'medium': Limits to 20 requests per 10 seconds.
 * - 'long': Limits to 100 requests per 60 seconds.
 */
@Global()
@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        name: 'short',
        ttl: 1000,
        limit: 3,
      },
      {
        name: 'medium',
        ttl: 10000,
        limit: 20,
      },
      {
        name: 'long',
        ttl: 60000,
        limit: 100,
      },
    ]),
  ],
})
export class GlobalThrottlerModule {}
