import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FilesService } from '../application/files.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}
  @Post('upload-avatar')
  @UseInterceptors(FileInterceptor('avatar'))
  uploadFile(@UploadedFile() avatar: Express.Multer.File) {
    console.log(avatar);
  }
}
