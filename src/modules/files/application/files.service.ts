import { Injectable } from '@nestjs/common';
import { AuthRepository } from '../../auth/infrastructure/auth.repository';
import sharp from 'sharp';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { join, extname } from 'path';

@Injectable()
export class FilesService {
  private readonly uploadFolder = 'upload';

  constructor(private readonly authRepository: AuthRepository) {}

  private ensureUploadFolderExists() {
    if (!existsSync(this.uploadFolder)) {
      mkdirSync(this.uploadFolder, { recursive: true });
    }
  }

  async handleFile(file: Express.Multer.File, userId: string): Promise<void> {
    this.ensureUploadFolderExists();

    const processedImage = await sharp(file.buffer).resize(500, 500).toBuffer();
    const filename = `${Date.now()}${extname(file.originalname)}`;
    const filepath = join(this.uploadFolder, filename);

    writeFileSync(filepath, processedImage);
    await this.authRepository.updateAvatarPath(userId, filepath);
  }
}
