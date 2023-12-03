import { Injectable } from '@nestjs/common';
import { JwtService as NestJwtService } from '@nestjs/jwt';

@Injectable()
export class JwtService {
  constructor(private readonly nestJwtService: NestJwtService) {}

  generateAccessToken(userId: string): string {
    const payload = { userId };
    return this.nestJwtService.sign(payload, {
      expiresIn: '15m',
    });
  }

  generateRefreshToken(userId: string): string {
    const payload = { userId };
    return this.nestJwtService.sign(payload, {
      expiresIn: '7d',
    });
  }
}
