import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { RegistrationDto } from '../api/input-dtos/registration.dto';
import { AuthRepository } from '../infrastructure/auth.repository';
import { AuthQueryRepository } from '../infrastructure/auth.query-repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '../../jwt/jwt.service';
import { MailerService } from '../../mailer/application/mailer.service';
import { LoginDto } from '../api/input-dtos/login.dto';

/**
 * Service handling authentication tasks.
 * This service encapsulates the logic for user authentication and registration,
 * leveraging both AuthRepository and AuthQueryRepository for data persistence and retrieval.
 */
@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly authQueryRepository: AuthQueryRepository,
    private readonly mailerService: MailerService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Handles the user registration process.
   * Checks if the user already exists with the provided email.
   * If the user exists, throws a ConflictException.
   * If the user does not exist, hashes the provided password and creates a new user record.
   * After successful user creation, sends a registration notification email.
   * Catches and handles any unexpected errors by throwing an InternalServerErrorException.
   *
   * @param {RegistrationDto} dto - Data Transfer Object with the user's registration information.
   * @throws {ConflictException} if a user with the provided email already exists.
   * @throws {InternalServerErrorException} for any other unexpected errors.
   */

  async registration(dto: RegistrationDto): Promise<void> {
    try {
      const userExists = await this.authQueryRepository.findUserByEmail(
        dto.email,
      );

      if (userExists) {
        throw new ConflictException('User with the same email already exists');
      }

      const hashedPassword = await bcrypt.hash(dto.password, 10);
      await this.authRepository.create({
        ...dto,
        password: hashedPassword,
      });

      await this.mailerService.sendRegistrationNotification(dto.email);
    } catch (error) {
      if (!(error instanceof ConflictException)) {
        throw new InternalServerErrorException(
          'An unexpected error occurred during registration',
        );
      }
      throw error;
    }
  }

  async login({ password, email }: LoginDto) {
    const user = await this.authQueryRepository.findUserByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordMatching = await bcrypt.compare(password, user.password);

    if (!isPasswordMatching) {
      throw new UnauthorizedException('Invalid credentials');
    }
  }
}
