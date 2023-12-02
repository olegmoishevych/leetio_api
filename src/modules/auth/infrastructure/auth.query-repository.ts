import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Auth } from '../domain/schema/auth.schema';

@Injectable()
export class AuthQueryRepository {
  constructor(@InjectModel(Auth.name) private authModel: Model<Auth>) {}

  async findUserByEmail(email: string): Promise<Auth | null> {
    return this.authModel.findOne({ email }).exec();
  }
}
