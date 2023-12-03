import { IsString, IsEmail, IsDate, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

/**
 * Data Transfer Object for user registration.
 * This class defines the structure of data received for user registration,
 * including validations for each field using class-validator decorators.
 */

export class RegistrationDto {
  @IsString({ message: 'firstName must be a string' })
  @ApiProperty({ description: 'First name of the user' })
  firstName: string;

  @IsString({ message: 'lastName must be a string' })
  @ApiProperty({ description: 'Last name of the user' })
  lastName: string;

  @IsEmail({}, { message: 'Invalid email format' })
  @ApiProperty({ description: 'Email address of the user', format: 'email' })
  email: string;

  @Type(() => Date)
  @IsDate({ message: 'dateOfBirth must be a Date format' })
  @ApiProperty({ description: 'Date of birth of the user', type: Date })
  dateOfBirth: Date;

  @IsString({ message: 'avatar must be a base64 format' })
  @IsOptional()
  @ApiProperty({
    description: 'Avatar of the user in base64 format',
    required: false,
  })
  avatar?: string;

  @IsString({ message: 'password must be a string' })
  @ApiProperty({ description: 'Password for the user account' })
  password: string;
}
