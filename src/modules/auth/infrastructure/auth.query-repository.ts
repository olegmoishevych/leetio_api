import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Auth } from '../domain/schema/auth.schema';

@Injectable()
export class AuthRepository {
  constructor(@InjectModel(Auth.name) private authModel: Model<Auth>) {}

  async findByEmail(email: string): Promise<Auth | null> {
    return this.authModel.findOne({ email }).exec();
  }
}
