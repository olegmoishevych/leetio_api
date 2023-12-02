import {
  BadRequestException,
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';

/**
 * Sets up a global validation pipe with specific configuration options.
 * The pipe will validate incoming requests against defined DTOs,
 * handle data transformation and error formatting.
 *
 * @param {INestApplication} app - The instance of the NestJS application.
 */
export function pipeSetup(app: INestApplication) {
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      stopAtFirstError: true,
      transformOptions: {
        enableImplicitConversion: true,
      },

      exceptionFactory: (errors) => {
        const formattedErrors = errors.map((error) => ({
          field: error.property,
          message: Object.values(error.constraints).join(', '),
        }));
        return new BadRequestException(formattedErrors);
      },
    }),
  );
}
