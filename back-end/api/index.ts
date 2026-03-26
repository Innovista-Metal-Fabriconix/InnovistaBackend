import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from '../src/app.module';
import serverlessExpress from '@vendia/serverless-express';
import express from 'express';
import cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';

let cachedServer: any;

async function bootstrap() {
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
    });

    await app.init();

    cachedServer = serverlessExpress({ app: expressApp });
  }

  return cachedServer;
}

export default async function handler(req: any, res: any) {
  const server = await bootstrap();
  return server(req, res);
}