import { IsString, IsEmail, IsDate, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

/**
 * Data Transfer Object for user registration.
 * This class defines the structure of data received for user registration,
 * including validations for each field using class-validator decorators.
 */

export class RegistrationDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @Type(() => Date)
  @IsDate()
  dateOfBirth: Date;

  @IsString()
  @IsOptional()
  avatar?: string;

  @IsString()
  password: string;
}
