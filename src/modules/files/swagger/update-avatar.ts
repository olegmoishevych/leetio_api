import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiConsumes,
  ApiBody,
  ApiResponse,
  ApiUnauthorizedResponse,
  ApiConflictResponse,
  ApiTooManyRequestsResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';

export function ApiUpdateAvatarSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Update User Avatar',
      description: 'Allows a user to update their profile avatar.',
    }),
    ApiConsumes('multipart/form-data'),
    ApiBody({
      description: 'Avatar Image',
      schema: {
        type: 'object',
        properties: {
          avatar: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    }),
    ApiResponse({ status: 200, description: 'Avatar successfully updated.' }),
    ApiUnauthorizedResponse({ description: 'User is not authenticated.' }),
    ApiConflictResponse({
      description: 'Invalid file format. Only PNG and JPG are allowed.',
    }),
    ApiTooManyRequestsResponse({
      description: 'Request limit exceeded. Please try again later.',
    }),
    ApiBearerAuth(),
  );
}
