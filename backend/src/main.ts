import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor } from './interceptors/transform.interceptor';
import { ResponseInterceptor } from './interceptors/response.interceptor';
import { ValidationPipe } from '@nestjs/common';
import { EntityNotFoundExceptionFilter } from './exceptions/filters/entity-not-found-exception.filter';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  app.enableCors();
  app.useGlobalInterceptors(
    new TransformInterceptor(),
    new ResponseInterceptor(),
  );
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new EntityNotFoundExceptionFilter());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
