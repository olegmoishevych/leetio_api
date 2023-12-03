import { Injectable } from '@nestjs/common';
import { promises as fs } from 'fs';
import { join } from 'path';
import { AuthRepository } from '../../auth/infrastructure/auth.repository';

@Injectable()
export class FilesService {
  private readonly uploadPath = 'upload/avatar';

  constructor(private readonly authRepository: AuthRepository) {}

  async updateUserAvatar(
    userId: string,
    file: Express.Multer.File,
  ): Promise<string> {
    const userFolderPath = join(this.uploadPath, userId);
    await fs.mkdir(userFolderPath, { recursive: true });

    const filePath = join(userFolderPath, file.originalname);
    await fs.writeFile(filePath, file.buffer);

    await this.updateUserAvatarPath(userId, filePath);
    return filePath;
  }

  private async updateUserAvatarPath(
    userId: string,
    filePath: string,
  ): Promise<void> {
    await this.authRepository.updateAvatarPath(userId, filePath);
  }
}
