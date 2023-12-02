import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Auth } from '../domain/schema/auth.schema';

/**
 * Service for querying user authentication data.
 * This repository utilizes Mongoose models to perform database operations,
 * specifically targeting user authentication information.
 */

@Injectable()
export class AuthQueryRepository {
  constructor(@InjectModel(Auth.name) private authModel: Model<Auth>) {}

  /**
   * Retrieves a user entity based on their email address.
   * This method searches the database for a user with the specified email.
   * If found, it returns the user's authentication data, otherwise null.
   *
   * @param {string} email - The email address of the user to find.
   * @returns {Promise<Auth | null>} A Promise resolved with the user's Auth data or null if no matching user is found.
   */

  async findUserByEmail(email: string): Promise<Auth | null> {
    return this.authModel.findOne({ email }).exec();
  }
}
