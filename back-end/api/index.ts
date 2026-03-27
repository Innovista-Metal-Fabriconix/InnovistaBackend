import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';

let app: INestApplication;

export default async function (req: any, res: any) {
  if (!app) {
    app = await NestFactory.create(AppModule);
    
    // CORS FIX — allow requests from your Netlify frontend
    app.enableCors({
      origin: [
        'http://localhost:5173',
        'https://innovista-front-end.vercel.app',
        process.env.FRONTEND_URL
      ].filter(Boolean) as string[],
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
      credentials: true,
    });
    
    await app.init();
  }
  
  const server = app.getHttpAdapter().getInstance();
  try {
    server(req, res);
  } catch (error) {
    console.error('Error handling request:', error);
    res.status(500).send('Internal Server Error');
  }
}
