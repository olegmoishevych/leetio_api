import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Auth, AuthSchema } from './schema/auth.schema';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([{ name: Auth.name, schema: AuthSchema }]),
    JwtModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}