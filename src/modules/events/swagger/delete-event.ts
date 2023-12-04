import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
  ApiNotFoundResponse,
  ApiTooManyRequestsResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';

export function ApiDeleteEventSwagger() {
  return applyDecorators(
    ApiOperation({ summary: 'Delete an event' }),
    ApiOkResponse({
      description: 'Event successfully deleted',
      schema: {
        example: { message: 'Event successfully deleted' },
      },
    }),
    ApiBadRequestResponse({
      description: 'Invalid request',
    }),
    ApiUnauthorizedResponse({
      description: 'User not authorized to delete this event',
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
