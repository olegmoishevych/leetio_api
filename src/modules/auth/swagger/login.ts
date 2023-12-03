import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
  ApiOperation,
  ApiBody,
  ApiResponse,
  ApiTooManyRequestsResponse,
} from '@nestjs/swagger';
import { LoginDto } from '../api/input-dtos/login.dto';

export function ApiLoginSwagger() {
  return applyDecorators(
    ApiBadRequestResponse({
      description: 'If the inputModel has incorrect values',
      schema: { example: 'Invalid input data', description: 'Error message' },
    }),
    ApiUnauthorizedResponse({
      description: 'If the password or login is wrong',
    }),
    ApiOperation({ summary: 'Try login user to the system' }),
    ApiBody({
      description: 'Example request body',
      type: LoginDto,
    }),
    ApiResponse({
      status: 200,
      description:
        'Returns JWT accessToken (expired after 8 hours) in body and JWT refreshToken in cookie (http-only, secure) (expired after 30 days).',
      schema: { example: { accessToken: 'string' } },
    }),
    ApiTooManyRequestsResponse({
      description:
        'More than 5 attempts from one IP-address during 10 seconds or recaptcha failed',
    }),
  );
}
