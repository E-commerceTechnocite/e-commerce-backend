import { NestFactory, Reflector } from '@nestjs/core';
import { ApplicationModule } from '@app/application.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import {
  ClassSerializerInterceptor,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule);

  app.enableVersioning({ type: VersioningType.URI });
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  const config = new DocumentBuilder()
    .setTitle('E-commerce endpoints documentation')
    .addSecurity('customer', {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'Customer Token',
      description: 'Customer Token',
    })
    .addSecurity('admin', {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'Admin Token',
      description: 'Admin Token',
    })
    .build();

  app.enableCors({
    origin: '*',
    methods: ['GET,POST,PATCH,DELETE'],
    credentials: true,
  });

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('', app, document);

  await app.listen(3000);
}

bootstrap();
