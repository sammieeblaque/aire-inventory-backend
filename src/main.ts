import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor } from '@nestjs/common';
import helmet from 'helmet';
import * as compression from 'compression';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const reflector = app.get(Reflector);

  app.use(helmet());
  app.use(compression());

  app.enableCors({
    origin: '*',
  });

  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));

  await app.listen(3000);
}
bootstrap();
