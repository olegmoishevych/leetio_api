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

  async login({
    password,
    email,
    firstName,
  }: LoginDto): Promise<{ accessToken: string; refreshToken: string }> {
    const user = await this.authQueryRepository.findUserByEmail(email);

    if (
      !user ||
      user.firstName !== firstName ||
      !(await bcrypt.compare(password, user.password))
    ) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const accessToken = this.jwtService.generateAccessToken(user.id);
    const refreshToken = this.jwtService.generateRefreshToken(user.id);

    return { accessToken, refreshToken };
  }
}
