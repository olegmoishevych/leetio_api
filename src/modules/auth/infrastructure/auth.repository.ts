import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Auth } from '../domain/schema/auth.schema';
import { RegistrationDto } from '../api/input-dtos/registration.dto';

@Injectable()
export class AuthRepository {
  constructor(@InjectModel(Auth.name) private authModel: Model<Auth>) {}

  /**
   * Creates a new user with the provided registration data.
   *
   * @param {RegistrationDto} dto - DTO containing user registration data.
   * @returns {Promise<Auth>} A Promise that resolves to the created user object.
   */

  async create(dto: RegistrationDto): Promise<Auth> {
    const newUser = new this.authModel(dto);
    return newUser.save();
  }
}
