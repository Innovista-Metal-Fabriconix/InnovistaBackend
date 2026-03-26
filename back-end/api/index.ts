import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';

let cachedServer: any;

export default async function handler(req: any, res: any) {
  // VERBOSE LOGGING FOR CORS DEBUGGING
  const origin = req.headers.origin;
  const method = req.method;
  const url = req.url;
  console.log(`[CORS DEBUG] Request: ${method} ${url} | Origin: ${origin}`);

  try {
    if (!cachedServer) {
      console.log('[CORS DEBUG] Initializing NestJS App...');
      const app = await NestFactory.create(AppModule);

      app.enableCors({
        origin: (requestOrigin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
          const allowed = !requestOrigin ||
            ['https://innovista-front-end.vercel.app',
              'http://localhost:5173'
            ].includes(requestOrigin);
          console.log(`[CORS DEBUG] Origin ${requestOrigin} allowed: ${allowed}`);
          callback(null, allowed);
        },
        credentials: true,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        allowedHeaders: 'Content-Type,Accept,Authorization,X-Requested-With,X-CSRF-Token',
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
      console.log('[CORS DEBUG] NestJS App Initialized.');
    }

    return cachedServer(req, res);
  } catch (error: any) {
    console.error('[CORS DEBUG] CRITICAL INIT ERROR:', error);
    return res.status(500).json({
      statusCode: 500,
      message: 'Backend initialization failed',
      error: error.message,
      origin: origin, // Echo origin to help debug
    });
  }
}