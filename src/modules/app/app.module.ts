import { Module } from '@nestjs/common';
import { AppController } from './api/app.controller';
import { AppService } from './application/app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongodbModule } from '../../providers/mongodb/mongodb.module';
import { AuthModule } from '../auth/auth.module';
import { JwtModule } from '../jwt/jwt.module';
import { GlobalThrottlerModule } from '../throttler/throttler.module';

/**
 * Main application module.
 * This module acts as the root module of the application, orchestrating the integration of various features and services.
 * It imports essential modules for configuration, database connectivity, authentication, and JWT handling.
 */

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongodbModule,
    AuthModule,
    JwtModule,
    GlobalThrottlerModule,
  ],
  controllers: [AppController],
  providers: [AppService, ConfigService],
})
export class AppModule {}
