import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor } from '@nestjs/common';
import helmet from 'helmet';
import * as compression from 'compression';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const reflector = app.get(Reflector);

  app.use(helmet());
  app.use(compression());

  app.enableCors({
    origin: '*',
  });

  const config = new DocumentBuilder()
    .setTitle('Flowline API Documentation')
    .setDescription('The Flowline API description')
    .setVersion('1.0')
    .addTag('flowline')
    .addBearerAuth()
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory());

  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));

  await app.listen(3000);
}
bootstrap();
