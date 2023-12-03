import { Injectable } from '@nestjs/common';
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

  async handleFile(file: Express.Multer.File, userId: string): Promise<any> {
    this.ensureUploadFolderExists();
    const processedImage = await sharp(file.buffer).resize(500, 500).toBuffer();

    const filename = Date.now() + path.extname(file.originalname);
    const filepath = path.join(this.uploadFolder, filename);

    fs.writeFileSync(filepath, processedImage);
    await this.authRepository.updateAvatarPath(userId, filepath);
  }
}
