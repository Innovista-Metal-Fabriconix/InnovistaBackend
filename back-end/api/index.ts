import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import cookieParser from 'cookie-parser';
import type { IncomingMessage, ServerResponse } from 'http';

let handler: ((req: IncomingMessage, res: ServerResponse) => void) | null = null;
let initError: Error | null = null;

async function bootstrap() {
  if (handler) return handler;
  if (initError) throw initError;

  try {
    const app = await NestFactory.create(AppModule, {
      logger: ['error', 'warn', 'log'],
    });

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
    handler = app.getHttpAdapter().getInstance();
    console.log('[Vercel] Bootstrap success');
    return handler;
  } catch (err) {
    initError = err as Error;
    console.error('[Vercel] Bootstrap FAILED:', err);
    throw err;
  }
}

export default async (req: IncomingMessage, res: ServerResponse) => {
  try {
    const h = await bootstrap();
    if (h) {
      h(req, res);
    } else {
      throw new Error('Handler not available after bootstrap');
    }
  } catch (err) {
    console.error('[Vercel] Handler error:', err);
    (res as ServerResponse).writeHead(500, { 'Content-Type': 'application/json' });
    (res as ServerResponse).end(JSON.stringify({
      message: 'Bootstrap failed',
      error: (err as Error).message,
    }));
  }
};