// import { NestFactory } from '@nestjs/core';
// import { AppModule } from '../src/app.module';
// import { ValidationPipe } from '@nestjs/common';
// import cookieParser from 'cookie-parser';

// let cachedServer: any;

// export default async function handler(req: any, res: any) {
//   // VERBOSE LOGGING FOR CORS DEBUGGING
//   const origin = req.headers.origin;
//   const method = req.method;
//   const url = req.url;
//   console.log(`[CORS DEBUG] Request: ${method} ${url} | Origin: ${origin}`);
  
//   try {
//     if (!cachedServer) {
//       console.log('[CORS DEBUG] Initializing NestJS App...');
//       const app = await NestFactory.create(AppModule);

//       app.enableCors({
//         origin: (requestOrigin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
//           const allowed = !requestOrigin || ['https://innovista-frontend.netlify.app', 'http://localhost:5173'].includes(requestOrigin);
//           console.log(`[CORS DEBUG] Origin ${requestOrigin} allowed: ${allowed}`);
//           callback(null, allowed);
//         },
//         credentials: true,
//         methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
//         allowedHeaders: 'Content-Type,Accept,Authorization,X-Requested-With,X-CSRF-Token',
//       });

//       app.useGlobalPipes(
//         new ValidationPipe({
//           transform: true,
//           whitelist: true,
//           forbidNonWhitelisted: true,
//         }),
//       );

//       app.use(cookieParser());

//       await app.init();
//       cachedServer = app.getHttpAdapter().getInstance();
//       console.log('[CORS DEBUG] NestJS App Initialized.');
//     }

//     return cachedServer(req, res);
//   } catch (error: any) {
//     console.error('[CORS DEBUG] CRITICAL INIT ERROR:', error);
//     return res.status(500).json({
//       statusCode: 500,
//       message: 'Backend initialization failed',
//       error: error.message,
//       origin: origin, // Echo origin to help debug
//     });
//   }
// }

import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from '../src/AllExceptions.filter';
import cookieParser from 'cookie-parser';

let cachedServer: any;

const ALLOWED_ORIGINS = [
  'https://innovista-frontend.netlify.app',
  'http://localhost:5173',
];

export default async function handler(req: any, res: any) {
  const origin = req.headers.origin;

  // ✅ STEP 1: Set CORS headers on EVERY response before anything else
  if (origin && ALLOWED_ORIGINS.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    );
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Content-Type,Accept,Authorization,X-Requested-With,X-CSRF-Token',
    );
  }

  // ✅ STEP 2: Short-circuit OPTIONS preflight — never let it reach NestJS
  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }

  // ✅ STEP 3: Boot NestJS once, cache it
  try {
    if (!cachedServer) {
      const app = await NestFactory.create(AppModule, {
        logger: ['error', 'warn'],
      });

      app.enableCors({
        origin: (
          requestOrigin: string | undefined,
          callback: (err: Error | null, allow?: boolean) => void,
        ) => {
          if (!requestOrigin || ALLOWED_ORIGINS.includes(requestOrigin)) {
            callback(null, true);
          } else {
            callback(new Error(`CORS blocked: ${requestOrigin}`), false);
          }
        },
        credentials: true,
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
        allowedHeaders: [
          'Content-Type',
          'Accept',
          'Authorization',
          'X-Requested-With',
          'X-CSRF-Token',
        ],
      });

      app.useGlobalPipes(
        new ValidationPipe({
          transform: true,
          whitelist: true,
          forbidNonWhitelisted: true,
        }),
      );

      app.useGlobalFilters(new AllExceptionsFilter());
      app.use(cookieParser());

      await app.init();
      cachedServer = app.getHttpAdapter().getInstance();
    }

    return cachedServer(req, res);
  } catch (error: any) {
    console.error('[INIT ERROR]', error);
    return res.status(500).json({
      statusCode: 500,
      message: 'Backend initialization failed',
      error: error.message,
    });
  }
}