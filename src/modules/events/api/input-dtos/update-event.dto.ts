import { IsOptional, IsString, IsDate } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateEventDto {
  @ApiProperty({
    example: 'Updated Conference',
    description: 'Name of the event',
    required: false,
  })
  @IsString({ message: 'Name must be a string' })
  @IsOptional()
  name?: string;

  @ApiProperty({
    example: 'New Park',
    description: 'Location of the event',
    required: false,
  })
  @IsString({ message: 'Location must be a string' })
  @IsOptional()
  location?: string;

  @ApiProperty({
    example: '2023-08-21T19:00:00.000Z',
    description: 'Start date and time of the event',
    required: false,
  })
  @Type(() => Date)
  @IsDate({ message: 'Start date must be a valid date' })
  @IsOptional()
  startDate?: Date;

  @ApiProperty({
    example: '2023-08-22T23:00:00.000Z',
    description: 'End date and time of the event',
    required: false,
  })
  @Type(() => Date)
  @IsDate({ message: 'End date must be a valid date' })
  @IsOptional()
  endDate?: Date;

  @ApiProperty({
    example: 'Updated description of the event.',
    description: 'Description of the event',
    required: false,
  })
  @IsString({ message: 'Description must be a string' })
  @IsOptional()
  description?: string;
}
