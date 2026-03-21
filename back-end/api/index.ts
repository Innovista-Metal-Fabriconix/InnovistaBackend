import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../back-end/src/app.module'; // ✅ IMPORTANT: use dist
import serverlessExpress from '@vendia/serverless-express';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';

let cachedServer;

async function bootstrap() {
  const expressApp = express();

  const nestApp = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressApp),
  );

  nestApp.enableCors();

  await nestApp.init();

  return serverlessExpress({ app: expressApp });
}

export default async function handler(req, res) {
  if (!cachedServer) {
    cachedServer = await bootstrap();
  }
  return cachedServer(req, res);
}