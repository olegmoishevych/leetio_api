import {
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesService } from '../application/files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtMiddleware } from '../../../middlewares/jwt.middleware';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}
  @Post('upload-avatar')
  @UseGuards(JwtMiddleware)
  @UseInterceptors(FileInterceptor('avatar'))
  uploadFile(@UploadedFile() avatar: Express.Multer.File) {
    console.log(avatar);
  }
}
