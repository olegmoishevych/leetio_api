import { IsString, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * Data Transfer Object (DTO) for user login.
 * This DTO is used for transferring login data from the client to the server.
 * It includes properties for user credentials and employs decorators from 'class-validator'
 * for validating the input data to ensure it meets the required format.
 */

export class LoginDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'Email of the user',
  })
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @ApiProperty({ example: 'password123', description: 'Password of the user' })
  @IsString({ message: 'Password must be a string' })
  password: string;
}
