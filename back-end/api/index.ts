import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';

let cachedServer: any;

export default async function handler(req: any, res: any) {
  try {
    if (!cachedServer) {
      const app = await NestFactory.create(AppModule);

      app.enableCors({
        origin: 'https://innovista-frontend.netlify.app/#/',
        credentials: true,
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
    console.error('[Backend Init Error]', error);
    return res.status(500).json({
      statusCode: 500,
      message: 'Backend initialization failed',
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
    });
  }
}