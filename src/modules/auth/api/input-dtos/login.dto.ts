import { IsString, IsEmail } from 'class-validator';

/**
 * Data Transfer Object (DTO) for user login.
 * This DTO is used for transferring login data from the client to the server.
 * It includes properties for user credentials and employs decorators from 'class-validator'
 * for validating the input data to ensure it meets the required format.
 */

export class LoginDto {
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @IsString({ message: 'Password must be a string' })
  password: string;

  @IsString({ message: 'firstName must be a string' })
  firstName: string;
}
