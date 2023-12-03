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

  /**
   * Endpoint for user registration.
   * Accepts a POST request with user registration details and delegates the registration logic to AuthService.
   * This endpoint is rate-limited to prevent abuse (e.g., using the 'short' rate limit configuration).
   * Returns the newly created user's data upon successful registration.
   *
   * @param {RegistrationDto} dto - Data Transfer Object containing the new user's registration information.
   * @returns {Promise<Auth>} A Promise resolved with the newly registered user's Auth data.
   */
  @HttpCode(HttpStatus.CREATED)
  @Post('registration')
  async registration(@Body() dto: RegistrationDto): Promise<void> {
    return this.authService.registration(dto);
  }

  @Post('login')
  async login(@Body() dto: LoginDto): Promise<any> {
    return this.authService.login(dto);
  }
}
