import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

/**
 * Swagger configuration for the API.
 * This function sets up Swagger for the NestJS application.
 *
 * @param {INestApplication} app - The NestJS application instance.
 * @param {string} name - The base URL for the Swagger UI.
 * @returns Swagger UI setup.
 */
export const swaggerConfig = (app: INestApplication, name: string) => {
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Your API Name')
    .setDescription('Description of your API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);

  return SwaggerModule.setup(name, app, document);
};
