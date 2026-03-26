import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHello() {
    return {
      status: 'Backend is Live and Running on Vercel',
      timestamp: new Date().toISOString(),
      useful_links: {
        debug: '/debug/cors',
        projects: '/projects/getAllProjects',
      }
    };
  }
}
