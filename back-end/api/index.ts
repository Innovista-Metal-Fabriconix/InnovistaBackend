import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';

let cachedServer: any;

export default async function handler(req: any, res: any) {

  //  FORCE CORS HEADERS (CRITICAL FIX)
  res.setHeader('Access-Control-Allow-Origin', 'https://innovista-frontend.netlify.app');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  //  Handle preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (!cachedServer) {
    const app = await NestFactory.create(AppModule);

    app.enableCors({
      origin: 'https://innovista-frontend.netlify.app',
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
}