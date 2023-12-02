import { IsString, IsEmail, IsDate, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

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
  picture?: string;

  @IsString()
  password: string;
}
