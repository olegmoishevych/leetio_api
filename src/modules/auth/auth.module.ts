import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthService } from './application/auth.service';
import { AuthController } from './api/auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Auth, AuthSchema } from './domain/schema/auth.schema';
import { JwtModule } from '@nestjs/jwt';
import { AuthQueryRepository } from './infrastructure/auth.query-repository';
import { AuthRepository } from './infrastructure/auth.repository';
import { ThrottlerModule } from '@nestjs/throttler';
import { JwtService } from '../jwt/jwt.service';
import { MailerGlobalModule } from '../mailer/mailer.module';
import { JwtMiddleware } from '../../middlewares/jwt.middleware';

/**
 * Authentication module.
 * This module groups all the components related to authentication functionality,
 * including controllers, services, and repositories for handling authentication and authorization.
 */
@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10,
      },
    ]),
    ConfigModule,
    MongooseModule.forFeature([{ name: Auth.name, schema: AuthSchema }]),
    JwtModule,
    MailerGlobalModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtService,
    AuthRepository,
    AuthQueryRepository,
    JwtMiddleware,
  ],
  exports: [AuthQueryRepository, AuthRepository],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtMiddleware)
      .forRoutes(
        { path: 'auth/refresh-token', method: RequestMethod.POST },
        { path: 'auth/logout', method: RequestMethod.POST },
      );
  }
}
