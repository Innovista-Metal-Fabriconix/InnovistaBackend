import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';
import { AppModule } from '../src/app.module';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';

const server = express();

let cachedApp: any;

async function bootstrap() {
  if (!cachedApp) {
    const app = await NestFactory.create(
      AppModule,
      new ExpressAdapter(server),
    );

    app.useGlobalPipes(new ValidationPipe());
    app.use(cookieParser());

    app.enableCors({
      origin: [
        'http://localhost:5173',
        'https://your-frontend-domain.com',
      ],
      credentials: true,
    });

    await app.init();
    cachedApp = server;
  }

  return cachedApp;
}

export default async function handler(req: any, res: any) {
  const app = await bootstrap();
  return app(req, res);
}