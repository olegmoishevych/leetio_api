import { Module, Global } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { ConfigModule, ConfigService } from '@nestjs/config';

/**
 * GlobalThrottlerModule.
 * This module configures the throttling (rate-limiting) functionality for the application using asynchronous setup.
 * It leverages the ThrottlerModule from the @nestjs/throttler package along with dynamic configuration provided by the ConfigService.
 * The throttling configuration is fetched from environment variables, allowing for flexible deployment configurations.
 *
 * The actual throttling configuration (such as TTL and limit) is determined by the environment variables THROTTLE_TTL and THROTTLE_LIMIT.
 */
@Global()
@Module({
  imports: [
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => [
        {
          ttl: config.get('THROTTLE_TTL'),
          limit: config.get('THROTTLE_LIMIT'),
        },
      ],
    }),
  ],
})
export class GlobalThrottlerModule {}
