import { INestApplication } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { swaggerConfig } from './swagger/swagger.config';

/**
 * Application configuration function.
 * Sets up additional configurations such as Global Pipes and Swagger for API documentation.
 *
 * @param {INestApplication} app - The instance of the NestJS application.
 */

export const appConfig = (app: INestApplication) => {
  app.useGlobalPipes(new ValidationPipe());

  swaggerConfig(app, 'api');
};

/**
 * Base application configuration function.
 * Sets up essential configurations required for the application.
 * This can include middleware, database connections, etc.
 *
 * @param {INestApplication} app - The instance of the NestJS application.
 * @returns {INestApplication} The configured application instance.
 */

export const baseAppConfig = (app: INestApplication) => {
  const configService = app.get(ConfigService);

  return app;
};
