import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from '../src/app.module';
import express from 'express';
import cookieParser from 'cookie-parser';

const server = express();
let isReady = false;
let initError: Error | null = null;

async function createApp() {
  if (isReady) return server;
  if (initError) throw initError;

  try {
    const app = await NestFactory.create(
      AppModule,
      new ExpressAdapter(server),
      { logger: ['error', 'warn', 'log'] },
    );

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
    isReady = true;
    console.log('[Vercel] NestJS initialized successfully');
    return server;
  } catch (err) {
    initError = err as Error;
    console.error('[Vercel] Bootstrap failed:', err);
    throw err;
  }
}

export default async (req: express.Request, res: express.Response) => {
  try {
    const app = await createApp();
    app(req, res);
  } catch (err) {
    console.error('[Vercel] Handler error:', err);
    res.status(500).json({
      message: 'Bootstrap failed',
      error: (err as Error).message,
    });
  }
};