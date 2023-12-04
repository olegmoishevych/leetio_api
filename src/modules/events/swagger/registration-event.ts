import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
  ApiForbiddenResponse,
  ApiTooManyRequestsResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';

export function ApiRegisterToEventSwagger() {
  return applyDecorators(
    ApiOperation({ summary: 'Register user to an event' }),
    ApiCreatedResponse({
      description: 'User successfully registered to the event',
      schema: {
        example: {
          message: 'User registered to the event successfully',
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
