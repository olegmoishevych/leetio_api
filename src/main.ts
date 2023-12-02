import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { swaggerConfig } from './main/configuration/swagger/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const configService = app.get(ConfigService);
  const PORT = configService.get('PORT') || 8000;

  swaggerConfig(app, 'api');
  await app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`);
  });
}

bootstrap();
