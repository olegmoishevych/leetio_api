import { IsString, IsEmail } from 'class-validator';

/**
 * Data Transfer Object for user registration.
 * This class defines the structure of data received for user registration,
 * including validations for each field using class-validator decorators.
 */

export class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
