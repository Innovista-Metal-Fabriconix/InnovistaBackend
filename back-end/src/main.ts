import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

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

  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  console.log(` Application is running on port ${port}`);
}
bootstrap();