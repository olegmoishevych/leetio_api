import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiTooManyRequestsResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

export function ApiLogoutSwagger() {
  return applyDecorators(
    ApiOperation({
      summary:
        'Logout the user by revoking the refresh token provided in the cookie.',
    }),
    ApiResponse({
      status: 200,
      description:
        'No content. The refresh token is successfully revoked, and the user is logged out.',
    }),
    ApiUnauthorizedResponse({
      description:
        'If the JWT refreshToken in the cookie is missing, expired, or incorrect.',
    }),
    ApiTooManyRequestsResponse({
      description:
        'More than 5 attempts from one IP-address during 10 seconds or recaptcha failed',
    }),
  );
}
