import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiTooManyRequestsResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

export function ApiRefreshTokenSwagger() {
  return applyDecorators(
    ApiOperation({
      summary:
        "Generate new pair of access and refresh tokens. The client must send a valid refreshToken in a cookie, which will be revoked upon refreshing. The Device's LastActiveDate should be updated to the issued date of the new refresh token.",
    }),
    ApiResponse({
      status: 200,
      description:
        'Returns JWT accessToken (expired after 8 hours) in body and JWT refreshToken in cookie (http-only, secure) (expired after 30 days).',
      schema: { example: { accessToken: 'string' } },
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
