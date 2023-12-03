import { Injectable } from '@nestjs/common';
import { JwtService as NestJwtService } from '@nestjs/jwt';

@Injectable()
export class JwtService {
  constructor(private readonly nestJwtService: NestJwtService) {}

  generateConfirmationToken(userId: string): string {
    return this.nestJwtService.sign({ userId });
  }
  verifyToken(token: string) {
    return this.nestJwtService.verify(token);
  }
}
