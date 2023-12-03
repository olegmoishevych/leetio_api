import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { JwtService } from '../modules/jwt/jwt.service';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  use(req: Request, res: Response, next: NextFunction) {
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

    req.user = { userId: decoded.userId };
    next();
  }
}
