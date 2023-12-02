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

  /**
   * Creates a new user in the database.
   * This method takes a RegistrationDto, creates a new Auth document, and saves it to the database.
   * It is used for registering new users, storing their authentication and personal details.
   *
   * @param {RegistrationDto} dto - Data Transfer Object containing the new user's registration information.
   * @returns {Promise<Auth>} A Promise resolved with the newly created user's Auth document.
   */

  async create(dto: RegistrationDto): Promise<Auth> {
    const newUser = new this.authModel(dto);
    return newUser.save();
  }
}
