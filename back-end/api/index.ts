import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';

let cachedServer: any;

export default async function (req: any, res: any) {
  // Diagnostic logging for CORS issues
  console.log(`[CORS Diagnostic] Method: ${req.method}, Origin: ${req.headers.origin}, Path: ${req.url}`);

  if (!cachedServer) {
    const app = await NestFactory.create(AppModule);
    
    app.enableCors({
        origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
            const allowedOrigins = [
                'https://innovista-frontend.netlify.app',
                'http://localhost:5173',
                process.env.FRONTEND_URL
            ].filter(Boolean);

            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                console.log(`[CORS Denied] Origin ${origin} not in allowed list:`, allowedOrigins);
                callback(new Error('Not allowed by CORS'));
            }
        },
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        credentials: true,
        allowedHeaders: 'Content-Type,Accept,Authorization,X-Requested-With',
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
