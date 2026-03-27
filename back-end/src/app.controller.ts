import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHello() {
    return {
      status: 'API is operational',
      message: 'Innovista Backend is running on Vercel',
      documentation: 'Please refer to the API documentation for available endpoints',
      timestamp: new Date().toISOString(),
    };
  }
}
