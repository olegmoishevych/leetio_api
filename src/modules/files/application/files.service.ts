import { ConflictException, Injectable } from '@nestjs/common';
import { AuthRepository } from '../../auth/infrastructure/auth.repository';
import * as sharp from 'sharp';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class FilesService {
  private readonly uploadFolder = 'upload';

  constructor(private readonly authRepository: AuthRepository) {}
  ensureUploadFolderExists() {
    if (!fs.existsSync(this.uploadFolder)) {
      fs.mkdirSync(this.uploadFolder, { recursive: true });
    }
  }

  async handleFile(file: Express.Multer.File, userId: string): Promise<void> {
    this.ensureUploadFolderExists();

    const allowedExtensions = ['.png', '.jpg', '.jpeg'];
    const extension = path.extname(file.originalname).toLowerCase();

    if (!allowedExtensions.includes(extension)) {
      throw new ConflictException(
        'Invalid file format. Only PNG and JPG are allowed.',
        'Invalid file format',
      );
    }

    const filename = `${userId}${extension}`;
    const filepath = path.join(this.uploadFolder, filename);

    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath);
    }

    const processedImage = await sharp(file.buffer).resize(500, 500).toBuffer();
    fs.writeFileSync(filepath, processedImage);

    await this.authRepository.updateAvatarPath(userId, filepath);
  }
}
