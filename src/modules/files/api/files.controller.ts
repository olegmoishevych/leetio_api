import {
  Controller,
  Put,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesService } from '../application/files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtMiddleware } from '../../../middlewares/jwt.middleware';
import { Request } from 'express';
@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}
  @Put('upload-avatar')
  @UseGuards(JwtMiddleware)
  @UseInterceptors(FileInterceptor('avatar'))
  async updateUserAvatar(
    @UploadedFile() avatar: Express.Multer.File,
    @Req() req: Request,
  ) {
    const user = req.user as any;
    const userId = user.userId;

    return this.filesService.handleFile(avatar, userId);
  }
}
