import { Injectable } from '@nestjs/common';
import { JwtService as NestJwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

/**
 * Service for handling JWT (JSON Web Token) operations.
 * This service facilitates the creation and signing of access and refresh tokens.
 * It is used for user authentication and authorization.
 */
@Injectable()
export class JwtService {
  constructor(
    private readonly nestJwtService: NestJwtService,
    private readonly configService: ConfigService,
  ) {}
  generateAccessToken(userId: string): string {
    const secret = this.configService.get<string>('JWT_SECRET');
    const expiresIn = this.configService.get<string>(
      'JWT_ACCESS_TOKEN_EXPIRATION_TIME',
    );

    return this.nestJwtService.sign({ userId }, { secret, expiresIn });
  }

  generateRefreshToken(userId: string): string {
    const secret = this.configService.get<string>('JWT_SECRET');
    const expiresIn = this.configService.get<string>(
      'JWT_REFRESH_TOKEN_EXPIRATION_TIME',
    );

    return this.nestJwtService.sign({ userId }, { secret, expiresIn });
  }
  decodeToken(token: string): DecodedToken {
    return this.nestJwtService.decode(token) as DecodedToken;
  }

  verifyToken(token: string): boolean {
    try {
      const secret = this.configService.get<string>('JWT_SECRET');
      this.nestJwtService.verify(token, { secret });

      return true;
    } catch (error) {
      return false;
    }
  }
}
