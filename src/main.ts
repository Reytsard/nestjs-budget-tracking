import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { doubleCsrf } from 'csrf-csrf';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.enableCors({
    credentials: true,
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
