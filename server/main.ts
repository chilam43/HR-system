import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './src/app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import path from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });

  app.enableCors();
  app.useGlobalPipes;
  app.useStaticAssets(path.join(__dirname, '..', 'uploads'));

  new ValidationPipe({
    whitelist: true,
    transform: true,
  }),
    await app.listen(3000);
}
bootstrap();
