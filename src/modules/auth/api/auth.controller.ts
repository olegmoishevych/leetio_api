import {
  Controller,
  Post,
  Body,
  HttpStatus,
  HttpCode,
  Res,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from '../application/auth.service';
import { RegistrationDto } from './input-dtos/registration.dto';
import { LoginDto } from './input-dtos/login.dto';
import { Response, Request } from 'express';
import { ApiRegistrationSwagger } from '../swagger/registration';
import { ApiLoginSwagger } from '../swagger/login';
import { ApiRefreshTokenSwagger } from '../swagger/refreshToken';
import { ApiLogoutSwagger } from '../swagger/logout';
import { ApiTags } from '@nestjs/swagger';
import { JwtMiddleware } from '../../../middlewares/jwt.middleware';

/**
 * Controller that handles authentication-related requests.
 * This controller defines endpoints for user authentication operations like registration,
 * and potentially other CRUD operations for user management in the future.
 */

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @ApiRegistrationSwagger()
  @HttpCode(HttpStatus.CREATED)
  @Post('registration')
  async registration(@Body() dto: RegistrationDto): Promise<void> {
    return this.authService.registration(dto);
  }

  @ApiLoginSwagger()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(
    @Res({ passthrough: true }) response: Response,
    @Body() dto: LoginDto,
  ): Promise<{ accessToken: string }> {
    const { accessToken, refreshToken } = await this.authService.login(dto);

    response.cookie('refreshToken', refreshToken, { httpOnly: true });
    return { accessToken };
  }

  @ApiRefreshTokenSwagger()
  @HttpCode(HttpStatus.OK)
  @Post('refresh-token')
  @UseGuards(JwtMiddleware)
  async refreshToken(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ): Promise<{ accessToken: string }> {
    const refreshToken = request.cookies['refreshToken'];
    const newTokens = await this.authService.refreshToken(refreshToken);

    response.cookie('refreshToken', newTokens.refreshToken, { httpOnly: true });
    return { accessToken: newTokens.accessToken };
  }

  @ApiLogoutSwagger()
  @HttpCode(HttpStatus.OK)
  @Post('logout')
  @UseGuards(JwtMiddleware)
  async logout(@Res({ passthrough: true }) response: Response): Promise<void> {
    response.clearCookie('refreshToken');
  }
}
