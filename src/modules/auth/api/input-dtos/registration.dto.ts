import { IsString, IsEmail, IsDate, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

/**
 * Data Transfer Object for user registration.
 * This class defines the structure of data received for user registration,
 * including validations for each field using class-validator decorators.
 */

export class RegistrationDto {
  @IsString({ message: 'firstName must be a string' })
  firstName: string;

  @IsString({ message: 'lastName must be a string' })
  lastName: string;

  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @Type(() => Date)
  @IsDate({ message: 'dateOfBirth must be a Date format' })
  dateOfBirth: Date;

  @IsString({ message: 'avatar must be a base64 format' })
  @IsOptional()
  avatar?: string;

  @IsString({ message: 'password must be a string' })
  password: string;
}
