import { IsString, IsEmail } from 'class-validator';

/**
 * Data Transfer Object (DTO) for user login.
 * This DTO is used for transferring login data from the client to the server.
 * It includes properties for user credentials and employs decorators from 'class-validator'
 * for validating the input data to ensure it meets the required format.
 */

export class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
