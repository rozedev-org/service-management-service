import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  ClassSerializerInterceptor,
  Logger,
  ValidationPipe
} from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as fs from 'fs';
import { LoggerWinston } from '@common/utils/logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new LoggerWinston()
  });

  app.setGlobalPrefix('api/service-manager-service/v1');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true
      }
    })
  );

  //Activacion de serializacion
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  const config = new DocumentBuilder()
    .setTitle('Generic Adapter ')
    .setDescription('Adapter of Generic backend repo')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  fs.writeFileSync('./docs/swagger.json', JSON.stringify(document));
  app.enableCors();
  await app.listen(process.env.PORT || 8000, '0.0.0.0');
  Logger.log(`Application is running on: ${await app.getUrl()}`, 'Main');
}
bootstrap();
