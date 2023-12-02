import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Auth } from '../domain/schema/auth.schema';

@Injectable()
export class AuthQueryRepository {
  constructor(@InjectModel(Auth.name) private authModel: Model<Auth>) {}

  /**
   * Finds a user by their email address.
   *
   * @param {string} email - The email address of the user to find.
   * @returns {Promise<Auth | null>} A Promise that resolves to the user object if found, or null if not found.
   */

  async findUserByEmail(email: string): Promise<Auth | null> {
    return this.authModel.findOne({ email }).exec();
  }
}
