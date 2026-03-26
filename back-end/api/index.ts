import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from '../src/app.module';
import express, { Express } from 'express';
import cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';

let cachedServer: Express;

async function bootstrap(): Promise<Express> {
  if (!cachedServer) {
    const expressApp = express();

    const app = await NestFactory.create(
      AppModule,
      new ExpressAdapter(expressApp),
    );

    app.useGlobalPipes(new ValidationPipe());
    app.use(cookieParser());

    app.enableCors({
      origin: [
        'http://localhost:5173',
        'https://innovista-front-end.vercel.app'
      ],
      credentials: true,
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      allowedHeaders: 'Content-Type, Accept, Authorization',
    });

    await app.init();

    cachedServer = expressApp;
  }

  return cachedServer;
}

export default async function handler(req: any, res: any) {
  try {
    const server = await bootstrap();
    server(req, res);
  } catch (err) {
    console.error('Bootstrap error:', err);
    res.status(500).json({
      error: 'Server failed to initialize',
      message: (err as Error).message,
      stack: (err as Error).stack,
    });
  }
}