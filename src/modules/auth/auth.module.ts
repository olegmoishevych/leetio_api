import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthService } from './application/auth.service';
import { AuthController } from './api/auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Auth, AuthSchema } from './domain/schema/auth.schema';
import { JwtModule } from '@nestjs/jwt';
import { AuthQueryRepository } from './infrastructure/auth.query-repository';
import { AuthRepository } from './infrastructure/auth.repository';

/**
 * Authentication module.
 * This module groups all the components related to authentication functionality,
 * including controllers, services, and repositories for handling authentication and authorization.
 */
@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([{ name: Auth.name, schema: AuthSchema }]),
    JwtModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthRepository, AuthQueryRepository],
})
export class AuthModule {}
