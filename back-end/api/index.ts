import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from '../src/app.module';
import express, { Request, Response } from 'express';
import cookieParser from 'cookie-parser';

let cachedServer: any;

async function createServer() {
  if (cachedServer) return cachedServer;

  const server = express();
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));

  app.use(cookieParser());

  app.enableCors({
    origin: [
      'http://localhost:5173',
      'https://innovista-front-end.vercel.app',
    ],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    credentials: true,
  });

  await app.init();
  cachedServer = server;
  return server;
}

export default async (req: Request, res: Response) => {
  const server = await createServer();
  server(req, res);
};