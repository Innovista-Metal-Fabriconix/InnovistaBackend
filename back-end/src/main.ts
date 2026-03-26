import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './AllExceptions.filter';
import cookieParser from 'cookie-parser';

const ALLOWED_ORIGINS = [
  'https://innovista-frontend.netlify.app',
  'http://localhost:5173',
  'http://localhost:3000',
];

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS config
  app.enableCors({
    origin: (
      origin: string | undefined,
      callback: (err: Error | null, allow?: boolean) => void,
    ) => {
      if (!origin) return callback(null, true);
      if (ALLOWED_ORIGINS.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error(`CORS blocked for origin: ${origin}`), false);
    },
    credentials: true,
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type',
      'Accept',
      'Authorization',
      'X-Requested-With',
      'X-CSRF-Token',
    ],
    optionsSuccessStatus: 200,
  });

  app.use(cookieParser());

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.useGlobalFilters(new AllExceptionsFilter(ALLOWED_ORIGINS));

  await app.listen(process.env.PORT ?? 4000);
  console.log(` Server running on port ${process.env.PORT ?? 4000}`);
}

bootstrap();
