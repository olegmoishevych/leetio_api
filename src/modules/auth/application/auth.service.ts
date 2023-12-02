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

  async registration(dto: RegistrationDto): Promise<Auth> {
    const user = await this.authQueryRepository.findUserByEmail(dto.email);

    if (user) {
      throw new ConflictException('Пользователь с таким email уже существует');
    }

    return this.authRepository.create(dto);
  }
}
