import { ConflictException, Injectable } from '@nestjs/common';
import { Auth } from '../domain/schema/auth.schema';
import { RegistrationDto } from '../api/input-dtos/registration.dto';
import { AuthRepository } from '../infrastructure/auth.repository';
import { AuthQueryRepository } from '../infrastructure/auth.query-repository';
import * as bcrypt from 'bcrypt';
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
  ) {}

  /**
   * Handles user registration.
   * This method first checks if a user with the provided email already exists using AuthQueryRepository.
   * If a user exists, a ConflictException is thrown.
   * If no user exists, the password provided in the DTO is hashed for security.
   * A new user record, with the hashed password, is then created using AuthRepository.
   *
   * @param {RegistrationDto} dto - Data Transfer Object containing the new user's registration information, including the plaintext password.
   * @returns {Promise<Auth>} A Promise resolved with the newly created user's Auth data, including a hashed password for security.
   * @throws {ConflictException} if a user with the provided email already exists.
   */

  async registration(dto: RegistrationDto): Promise<Auth> {
    const user = await this.authQueryRepository.findUserByEmail(dto.email);

    if (user) {
      throw new ConflictException('User with the same email already exists');
    }

    const hash = await bcrypt.hash(dto.password, 10);
    const newUser = {
      ...dto,
      password: hash,
    };

    return this.authRepository.create(newUser);
  }
}
