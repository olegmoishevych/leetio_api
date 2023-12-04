import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
  ApiTooManyRequestsResponse,
} from '@nestjs/swagger';

export function ApiGetAllEventsSwagger() {
  return applyDecorators(
    ApiOperation({ summary: 'Retrieve all events' }),
    ApiOkResponse({
      description: 'List of all events',
      type: [Event],
    }),
    ApiResponse({
      status: 200,
      description: 'Successfully retrieved list of events',
      schema: {
        example: [
          {
            id: 'string',
            name: 'string',
            location: 'string',
            startDate: 'date',
            endDate: 'date',
            description: 'string',
          },
        ],
      },
    }),
    ApiTooManyRequestsResponse({
      description: 'Too many requests, please try again later',
    }),
  );
}
