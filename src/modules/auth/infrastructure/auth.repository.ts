import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Auth } from '../domain/schema/auth.schema';
import { RegistrationDto } from '../api/input-dtos/registration.dto';

/**
 * Repository for handling CRUD operations on the Auth model.
 * This class provides methods for interacting with the Auth collection in the database,
 * utilizing Mongoose Model for database operations.
 */
@Injectable()
export class AuthRepository {
  constructor(@InjectModel(Auth.name) private authModel: Model<Auth>) {}
  async create(dto: RegistrationDto): Promise<Auth> {
    const newUser = new this.authModel(dto);
    return newUser.save();
  }
}
