import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response, Request } from 'express';

const ALLOWED_ORIGINS = [
  'https://innovista-frontend.netlify.app',
  'http://localhost:5173',
];

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? exception.getResponse()
        : { message: (exception as Error).message, statusCode: status };

    // ✅ Re-apply CORS headers on error responses too
    // (Vercel can strip headers when errors occur before response)
    const origin = request.headers.origin as string;
    if (origin && ALLOWED_ORIGINS.includes(origin)) {
      response.setHeader('Access-Control-Allow-Origin', origin);
      response.setHeader('Access-Control-Allow-Credentials', 'true');
      response.setHeader(
        'Access-Control-Allow-Methods',
        'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      );
      response.setHeader(
        'Access-Control-Allow-Headers',
        'Content-Type,Accept,Authorization,X-Requested-With',
      );
    }

    response.status(status).json({
      ...(typeof message === 'object' ? message : { message }),
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}