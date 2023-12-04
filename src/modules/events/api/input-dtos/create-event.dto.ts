import { IsOptional, IsString, IsDate } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEventDto {
  @ApiProperty({
    example: 'Annual Conference',
    description: 'Name of the event',
  })
  @IsString({ message: 'Name must be a string' })
  name: string;

  @ApiProperty({
    example: 'Central Park',
    description: 'Location of the event',
  })
  @IsString({ message: 'Location must be a string' })
  location: string;

  @ApiProperty({
    example: '2023-07-21T19:00:00.000Z',
    description: 'Start date and time of the event',
    type: Date,
  })
  @Type(() => Date)
  @IsDate({ message: 'Start date must be a valid date' })
  startDate: Date;

  @ApiProperty({
    example: '2023-07-22T23:00:00.000Z',
    description: 'End date and time of the event',
    type: Date,
  })
  @Type(() => Date)
  @IsDate({ message: 'End date must be a valid date' })
  endDate: Date;

  @ApiProperty({
    example: 'This is a description of the event.',
    description: 'Description of the event',
    required: false,
  })
  @IsString({ message: 'Description must be a string' })
  @IsOptional()
  description?: string;
}
