import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';
import { AppModule } from '../src/app.module';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import { AllExceptionsFilter } from '../src/AllExceptions.filter';

const server = express();
let cachedApp: any;

async function bootstrap() {
  if (!cachedApp) {
    const app = await NestFactory.create(
      AppModule,
      new ExpressAdapter(server),
      { logger: false }
    );

    app.enableCors({
      origin: [
        'http://localhost:5173',
        'https://innovista-front-end.vercel.app',
      ],
      credentials: true,
      methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Accept', 'Authorization'],
    });

    app.use(cookieParser());

    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    );

    // ✅ Register the global exception filter
    app.useGlobalFilters(new AllExceptionsFilter());

    await app.init();
    cachedApp = server;
  }

  return cachedApp;
}

export default async function handler(req: any, res: any) {
  // ✅ Try/catch so bootstrap errors return 500 instead of silent 404
  try {
    const app = await bootstrap();
    return app(req, res);
  } catch (err) {
    console.error('[Vercel Handler] Bootstrap failed:', err);
    res.status(500).json({
      statusCode: 500,
      message: 'Server failed to initialize',
      error: String(err),
    });
  }
}