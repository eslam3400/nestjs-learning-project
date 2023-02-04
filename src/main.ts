import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { appConfig } from './app.config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: appConfig.app.validationWhiteList,
    }),
  );
  await app.listen(appConfig.app.port);
}
bootstrap();
