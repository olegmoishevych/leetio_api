import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
  ApiForbiddenResponse,
  ApiTooManyRequestsResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';

export function ApiUnregisterFromEventSwagger() {
  return applyDecorators(
    ApiOperation({ summary: 'Unregister user from an event' }),
    ApiOkResponse({
      description: 'User successfully unregistered from the event',
      schema: {
        example: {
          message: 'User unregistered from the event successfully',
          eventId: 'string',
          userId: 'string',
        },
      },
    }),
    ApiBadRequestResponse({
      description: 'Invalid input, object invalid',
    }),
    ApiUnauthorizedResponse({
      description: 'User not authorized or invalid token',
    }),
    ApiForbiddenResponse({
      description: 'Access to the resource is forbidden',
    }),
    ApiTooManyRequestsResponse({
      description: 'Too many requests, please try again later',
    }),
    ApiInternalServerErrorResponse({
      description: 'Internal server error',
    }),
  );
}
