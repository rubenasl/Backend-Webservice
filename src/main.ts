import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { CORS } from './constants';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  

  const configService = app.get (ConfigService);

  app.enableCors(CORS);
  app.useGlobalPipes(
    new ValidationPipe()
  )
  await app.listen(configService.get('PORT'));
  console.log(`Application running on: ${await app.getUrl()}`)
}
bootstrap();