import { Controller, Post, Body, HttpStatus, HttpCode } from '@nestjs/common';
import { AuthService } from '../application/auth.service';
import { RegistrationDto } from './input-dtos/registration.dto';
import { Auth } from '../domain/schema/auth.schema';
import { LoginDto } from './input-dtos/login.dto';

/**
 * Controller that handles authentication-related requests.
 * This controller defines endpoints for user authentication operations like registration,
 * and potentially other CRUD operations for user management in the future.
 */

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @HttpCode(HttpStatus.CREATED)
  @Post('registration')
  async registration(@Body() dto: RegistrationDto): Promise<void> {
    return this.authService.registration(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() dto: LoginDto): Promise<any> {
    return this.authService.login(dto);
  }
}
