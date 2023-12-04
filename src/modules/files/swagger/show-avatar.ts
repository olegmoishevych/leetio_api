import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiUnauthorizedResponse,
  ApiTooManyRequestsResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';

export function ApiGetImagesSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Get Avatar Images',
      description: 'Retrieves a list of available avatar images.',
    }),
    ApiResponse({
      status: 200,
      description: 'List of avatar images.',
      schema: {
        example: {
          files: {
            avatar1: 'http://localhost:3000/upload/avatar1.jpg',
            avatar2: 'http://localhost:3000/upload/avatar2.png',
          },
        },
      },
    }),
    ApiUnauthorizedResponse({ description: 'User is not authenticated.' }),
    ApiTooManyRequestsResponse({
      description: 'Request limit exceeded. Please try again later.',
    }),
    ApiBearerAuth(),
  );
}
