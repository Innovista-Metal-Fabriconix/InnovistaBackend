import { Controller, Get } from '@nestjs/common';

@Controller('debug')
export class DebugController {
  @Get('cors')
  test() {
    return { 
      status: 'CORS is working',
      timestamp: new Date().toISOString(),
      message: 'If you can see this, the basic CORS configuration is correct for this route.'
    };
  }
}
