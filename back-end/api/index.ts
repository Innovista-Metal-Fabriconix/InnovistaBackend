import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';
import { AppModule } from '../src/app.module';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';

const server = express();

let cachedApp: any;

async function bootstrap() {
  try {
    if (!cachedApp) {
      console.log('[CORS DEBUG] Initializing NestJS App...');
      const app = await NestFactory.create(
        AppModule,
        new ExpressAdapter(server),
      );

      app.useGlobalPipes(new ValidationPipe());
      app.use(cookieParser());

      app.enableCors({
        origin: [
          'http://localhost:5173',
          'https://innovistafrontend.netlify.app'
        ],
        credentials: true,
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Accept', 'Authorization', 'X-Requested-With', 'X-CSRF-Token'],
      });

      await app.init();
      cachedApp = server;
      console.log('[CORS DEBUG] NestJS App Initialized.');
    }
    return cachedApp;
  } catch (error: any) {
    console.error('[CORS DEBUG] CRITICAL INIT ERROR:', error);
    throw error;
  }
}

export default async function handler(req: any, res: any) {
  // VERBOSE LOGGING FOR CORS/ROUTING DEBUGGING
  const origin = req.headers.origin;
  const method = req.method;
  const url = req.url;
  console.log(`[Vercel Handler] Request: ${method} ${url} | Origin: ${origin}`);

  try {
    const app = await bootstrap();
    return app(req, res);
  } catch (error: any) {
    return res.status(500).json({
      statusCode: 500,
      message: 'Backend initialization failed',
      error: error.message,
      stack: error.stack,
      url: url,
    });
  }
}