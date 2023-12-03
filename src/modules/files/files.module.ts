import { Module } from '@nestjs/common';
import { FilesService } from './application/files.service';
import { FilesController } from './api/files.controller';

@Module({
  controllers: [FilesController],
  providers: [FilesService],
})
export class FilesModule {}
