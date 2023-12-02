import { ConflictException, Injectable } from '@nestjs/common';
import { Auth } from '../domain/schema/auth.schema';
import { RegistrationDto } from '../api/input-dtos/registration.dto';
import { AuthRepository } from '../infrastructure/auth.repository';
import { AuthQueryRepository } from '../infrastructure/auth.query-repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly authQueryRepository: AuthQueryRepository,
  ) {}

  /**
   * Registers a new user in the system.
   * Checks if a user with the same email already exists.
   * Throws a ConflictException if a user with the same email exists.
   * Otherwise, creates a new user.
   *
   * @param {RegistrationDto} dto - DTO containing user registration data.
   * @returns {Promise<Auth>} A Promise that resolves to the created user object.
   * @throws {ConflictException} if a user with the same email already exists.
   */

  async registration(dto: RegistrationDto): Promise<Auth> {
    const user = await this.authQueryRepository.findUserByEmail(dto.email);

    if (user) {
      throw new ConflictException('User with the same email already exists');
    }

    return this.authRepository.create(dto);
  }
}
