import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from '@app/application.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { VersioningType } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule);

  app.enableVersioning({ type: VersioningType.URI });

  const config = new DocumentBuilder()
    .setTitle('E-commerce endpoints documentation')
    .build();

  app.enableCors({ origin: 'http://localhost:8080' });

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('', app, document);

  await app.listen(3000);
}

bootstrap();
