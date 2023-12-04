import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
  ApiNotFoundResponse,
  ApiTooManyRequestsResponse,
  ApiInternalServerErrorResponse,
  ApiBody,
} from '@nestjs/swagger';
import { UpdateEventDto } from '../api/input-dtos/update-event.dto';

export function ApiUpdateEventSwagger() {
  return applyDecorators(
    ApiOperation({ summary: 'Update an event' }),
    ApiBody({ type: UpdateEventDto }),
    ApiOkResponse({
      description: 'Event successfully updated',
      type: UpdateEventDto,
    }),
    ApiBadRequestResponse({
      description: 'Invalid input, object invalid',
    }),
    ApiUnauthorizedResponse({
      description: 'User not authorized or invalid token',
    }),
    ApiNotFoundResponse({
      description: 'Event not found',
    }),
    ApiTooManyRequestsResponse({
      description: 'Too many requests, please try again later',
    }),
    ApiInternalServerErrorResponse({
      description: 'Internal server error',
    }),
  );
}
