import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongodbModule } from '../mongodb/mongodb.module';
import { AuthModule } from '../auth/auth.module';
import { JwtModule } from '../jwt/jwt.module';

@Module({
  imports: [ConfigModule.forRoot(), MongodbModule, AuthModule, JwtModule],
  controllers: [AppController],
  providers: [AppService, ConfigService],
})
export class AppModule {}
