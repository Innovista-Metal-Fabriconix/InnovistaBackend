// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import { ValidationPipe } from '@nestjs/common';
// import cookieParser from 'cookie-parser';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);

//   // Allow your frontend origin
//   app.enableCors({
//     origin: 'https://innovista-frontend.netlify.app', 
//     credentials: true,
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
//     allowedHeaders: [
//       'Content-Type',
//       'Authorization',
//       'Accept',
//       'X-Requested-With',
//       'X-CSRF-Token',
//     ],
//   });

//   app.useGlobalPipes(
//     new ValidationPipe({
//       transform: true,
//       whitelist: true,
//       forbidNonWhitelisted: true,
//     }),
//   );

//   app.use(cookieParser());

//   await app.listen(process.env.PORT || 4000);
// }
// bootstrap();


import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from '../src/AllExceptions.filter';
import cookieParser from 'cookie-parser';

const ALLOWED_ORIGINS = [
  'https://innovista-frontend.netlify.app',
  'http://localhost:5173',
];

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: (
      requestOrigin: string | undefined,
      callback: (err: Error | null, origin?: boolean) => void,
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

  await app.listen(process.env.PORT || 4000);
  console.log(`Server running on port ${process.env.PORT || 4000}`);
}

bootstrap();