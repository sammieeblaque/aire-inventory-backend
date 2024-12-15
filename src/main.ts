import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor } from '@nestjs/common';
import helmet from 'helmet';
import * as compression from 'compression';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
// import multer from 'multer';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const reflector = app.get(Reflector);

  app.use(helmet());
  app.use(compression());

  app.enableCors({
    origin: '*',
  });

  const config = new DocumentBuilder()
    .setTitle('Aire Beauty API Documentation')
    .setDescription('The Aire API description')
    .setVersion('1.0')
    .addTag('Aire')
    // .addBearerAuth()
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory());

  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
