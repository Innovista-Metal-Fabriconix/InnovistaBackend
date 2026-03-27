import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';

let app: any;

export default async function (req: any, res: any) {
  if (!app) {
    app = await NestFactory.create(AppModule);
    
    // CORS FIX — allow requests from your Netlify frontend
    app.enableCors({
      origin: [
        'http://localhost:5173',
        'https://innovista-front-end.vercel.app'
      ],
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
      credentials: true, // required for cookies
    });
    
    await app.init();
  }
  
  const server = app.getHttpAdapter().getInstance();
  return server(req, res);
}
