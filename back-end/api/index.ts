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
      { logger: ['error', 'warn', 'log'] }, // ensure logs appear in Vercel
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
    return server;
  } catch (err) {
    initError = err as Error;
    console.error('[Vercel] NestJS bootstrap failed:', err);
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
      message: 'Internal server error during bootstrap',
      error: (err as Error).message,
    });
  }
};