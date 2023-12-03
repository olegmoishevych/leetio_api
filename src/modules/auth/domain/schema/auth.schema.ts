import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

/**
 * Mongoose schema for user authentication.
 * This class defines the structure of the 'auth' document in the database,
 * including various fields related to user information and authentication details.
 * It extends Mongoose's Document class for integration with MongoDB.
 */

@Schema({
  versionKey: false,
  timestamps: true,
})
export class Auth extends Document {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  dateOfBirth: Date;

  @Prop({ default: 'none' })
  avatar: string;

  @Prop({ required: true })
  password: string;
}

export const AuthSchema = SchemaFactory.createForClass(Auth);
