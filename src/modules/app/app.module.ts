import { Module } from '@nestjs/common';
import { AppController } from './api/app.controller';
import { AppService } from './application/app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongodbModule } from '../../providers/mongodb/mongodb.module';
import { AuthModule } from '../auth/auth.module';
import { JwtModule } from '../jwt/jwt.module';

@Module({
  imports: [ConfigModule.forRoot(), MongodbModule, AuthModule, JwtModule],
  controllers: [AppController],
  providers: [AppService, ConfigService],
})
export class AppModule {}
