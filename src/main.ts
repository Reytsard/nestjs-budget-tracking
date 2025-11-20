import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { doubleCsrf } from 'csrf-csrf';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.enableCors({
    origin: 'http://192.168.1.5:3000',
    credentials: true,
  });
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
