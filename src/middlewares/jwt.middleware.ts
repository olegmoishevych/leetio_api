import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { JwtService } from '../modules/jwt/jwt.service';
import { AuthQueryRepository } from '../modules/auth/infrastructure/auth.query-repository';
@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private readonly authQueryRepository: AuthQueryRepository,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const refreshToken = req.cookies?.['refreshToken'];
    if (!refreshToken) {
      throw new UnauthorizedException('No token provided');
    }

    const decoded = this.jwtService.decodeToken(refreshToken);
    if (!decoded || !decoded.userId) {
      throw new UnauthorizedException('Invalid token');
    }

    if (!this.jwtService.verifyToken(refreshToken)) {
      throw new UnauthorizedException('Invalid or expired token');
    }

    const user = await this.authQueryRepository.findUserById(decoded.userId);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    req.user = { userId: decoded.userId };
    next();
  }
}
