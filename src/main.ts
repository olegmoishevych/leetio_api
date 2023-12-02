import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { appConfig, baseAppConfig } from './main/configuration/app.config';
import { ConfigService } from '@nestjs/config';

/**
 * The main bootstrap function to start the NestJS application.
 * Initializes the application and sets up the configuration.
 * Retrieves the PORT from ConfigService and starts the application listening on that port.
 */

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  baseAppConfig(app);
  appConfig(app);

  const PORT = app.get(ConfigService).get('PORT') || 8000;
  await app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`);
  });
}

bootstrap();
