import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { FilesService } from './application/files.service';
import { FilesController } from './api/files.controller';
import { JwtModule } from '../jwt/jwt.module';
import { AuthModule } from '../auth/auth.module';
import { JwtMiddleware } from '../../middlewares/jwt.middleware';

@Module({
  imports: [JwtModule, AuthModule],
  controllers: [FilesController],
  providers: [FilesService],
})
export class FilesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtMiddleware)
      .forRoutes(
        { path: 'files/update-avatar', method: RequestMethod.PUT },
        { path: 'files/avatar', method: RequestMethod.GET },
      );
  }
}
