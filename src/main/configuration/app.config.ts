import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { swaggerConfig } from './swagger/swagger.config';
import { pipeSetup } from './pipe.setup';
import * as cookieParser from 'cookie-parser';

/**
 * Application configuration function.
 * Sets up additional configurations such as Global Pipes and Swagger for API documentation.
 *
 * @param {INestApplication} app - The instance of the NestJS application.
 */

export const appConfig = (app: INestApplication) => {
  pipeSetup(app);
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

  app.use(cookieParser());
  return app;
};
