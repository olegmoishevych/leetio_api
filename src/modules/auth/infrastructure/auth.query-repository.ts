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
  async findUserByEmail(email: string): Promise<Auth | null> {
    return this.authModel.findOne({ email }).exec();
  }
  async findUserById(userId: string): Promise<Auth | null> {
    return this.authModel.findOne({ _id: userId }).exec();
  }
}
