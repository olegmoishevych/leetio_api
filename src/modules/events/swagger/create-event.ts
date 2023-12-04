import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiBody,
  ApiUnauthorizedResponse,
  ApiTooManyRequestsResponse,
} from '@nestjs/swagger';
import { CreateEventDto } from '../api/input-dtos/create-event.dto';

export function ApiCreateEventSwagger() {
  return applyDecorators(
    ApiOperation({ summary: 'Create a new event' }),
    ApiBody({
      description: 'Event creation data',
      type: CreateEventDto,
    }),
    ApiOkResponse({
      description: 'Event created successfully',
      schema: {
        example: {
          id: 'string',
          name: 'string',
          location: 'string',
          startDate: 'date',
          endDate: 'date',
          description: 'string',
        },
      },
    }),
    ApiBadRequestResponse({
      description: 'Invalid input data',
      schema: { example: { message: 'Invalid input data' } },
    }),
    ApiUnauthorizedResponse({
      description: 'User not authorized',
    }),
    ApiTooManyRequestsResponse({
      description: 'Too many requests, please try again later',
    }),
  );
}
