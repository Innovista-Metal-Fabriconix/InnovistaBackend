import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';

let cachedServer: any;

export default async function (req: any, res: any) {
  if (!cachedServer) {
    const app = await NestFactory.create(AppModule);
    
    app.enableCors({
        origin: [
            'https://innovista-frontend.netlify.app',
            'http://localhost:5173',
            process.env.FRONTEND_URL
        ],
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
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
