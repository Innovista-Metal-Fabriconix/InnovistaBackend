import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';

let cachedServer: any;

export default async function handler(req: any, res: any) {
  // 1. Manually set CORS headers for EVERY request (including preflight and errors)
  const origin = 'https://innovista-frontend.netlify.app';
  res.setHeader('Access-Control-Allow-Origin', origin);
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Accept,Authorization,X-Requested-With,X-CSRF-Token');

  // 2. Handle preflight early
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    if (!cachedServer) {
      const app = await NestFactory.create(AppModule);

      app.enableCors({
        origin: origin,
        credentials: true,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        allowedHeaders: 'Content-Type,Accept,Authorization,X-Requested-With,X-CSRF-Token',
      });

      app.useGlobalPipes(
        new ValidationPipe({
          transform: true,
          whitelist: true,
          forbidNonWhitelisted: true,
        }),
      );

      app.use(cookieParser());

      await app.init();
      cachedServer = app.getHttpAdapter().getInstance();
    }

    return cachedServer(req, res);
  } catch (error: any) {
    console.error('[CORS Overhaul] Init Error:', error);
    return res.status(500).json({
      statusCode: 500,
      message: 'Backend initialization failed',
      error: error.message,
    });
  }
}