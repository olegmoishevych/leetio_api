import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
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
import * as fs from 'fs';
@Controller('files')
export class FilesController {
  private readonly uploadFolder = 'upload';
  constructor(private readonly filesService: FilesService) {}
  @Put('upload-avatar')
  @HttpCode(HttpStatus.OK)
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

  @Get('avatar')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtMiddleware)
  async getImages(): Promise<{ [key: string]: string }> {
    this.filesService.ensureUploadFolderExists();
    const filenames = fs.readdirSync(this.uploadFolder);
    const files = filenames.reduce((acc, filename) => {
      acc[`avatar`] = `http://localhost:3000/upload/${filename}`;
      return acc;
    }, {} as any);

    return { files };
  }
}
