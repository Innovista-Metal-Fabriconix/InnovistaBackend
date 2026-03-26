import { Controller, Get } from '@nestjs/common';

@Controller('debug')
export class DebugController {
  @Get('cors')
  test() {
    return {
      status: 'CORS is working',
      timestamp: new Date().toISOString(),
      message: 'If you can see this, CORS is configured correctly.',
    };
  }

  @Get('env')
  checkEnv() {
    return {
      JWT_PRIVATE_KEY: process.env.JWT_PRIVATE_KEY
        ? `Defined (Length: ${process.env.JWT_PRIVATE_KEY.length})`
        : 'UNDEFINED',
      DATABASE_URL: process.env.DATABASE_URL ? 'Defined' : 'UNDEFINED',
      FRONTEND_URL: process.env.FRONTEND_URL || 'UNDEFINED',
      NODE_ENV: process.env.NODE_ENV || 'UNDEFINED',
      PORT: process.env.PORT || 'UNDEFINED',
    };
  }
}