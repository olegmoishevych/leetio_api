import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from '../application/auth.service';
import { RegistrationDto } from './input-dtos/registration.dto';
import { Auth } from '../domain/schema/auth.schema';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('registration')
  async registration(@Body() dto: RegistrationDto): Promise<Auth> {
    return this.authService.registration(dto);
  }
}
