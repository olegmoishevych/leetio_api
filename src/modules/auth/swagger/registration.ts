import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOperation,
  ApiResponse,
  ApiTooManyRequestsResponse,
} from '@nestjs/swagger';

export function ApiRegistrationSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'User Registration',
      description:
        'This endpoint processes the registration of a new user. An email with a confirmation code is sent to the provided email address upon successful registration.',
    }),
    ApiResponse({
      status: 201,
      description:
        'Registration successful. An email with a confirmation code has been sent to the provided email address.',
    }),
    ApiBadRequestResponse({
      description:
        'Invalid input data. Occurs if incorrect values are provided (e.g., a user with the same email or username already exists).',
      schema: {
        example: {
          errorsMessages: [{ message: 'string', field: 'string' }],
        },
      },
    }),
    ApiTooManyRequestsResponse({
      description:
        'More than 5 attempts from one IP-address during 10 seconds or recaptcha failed',
    }),
  );
}
