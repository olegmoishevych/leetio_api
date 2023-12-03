import { Module } from '@nestjs/common';
import { FilesService } from './application/files.service';
import { FilesController } from './api/files.controller';
import { JwtModule } from '../jwt/jwt.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [JwtModule, AuthModule],
  controllers: [FilesController],
  providers: [FilesService],
})
export class FilesModule {}
