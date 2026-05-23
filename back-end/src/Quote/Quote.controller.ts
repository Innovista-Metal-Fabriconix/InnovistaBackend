import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Param,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { Throttle } from '@nestjs/throttler';
import { AdminAuthGuard } from '../Authentication/Authentication.AdminAuthgurd';
import { QuoteService } from './Quote.service';
import { QuoteSubmissionPayload } from './Quote.types';

const ALLOWED_MIME_TYPES = ['application/pdf', 'image/jpeg', 'image/png'];
const MAX_FILES = 3;

@Controller('quote')
export class QuoteController {
  constructor(private readonly quoteService: QuoteService) {}

  @Post('otp/send')
  @HttpCode(200)
  @Throttle({ default: { limit: 5, ttl: 60_000 } })
  async sendOtp(@Body() body: { email?: string; clientName?: string }) {
    if (!body?.email) {
      throw new BadRequestException('Email is required.');
    }
    return this.quoteService.sendOtp(body.email, body.clientName ?? '');
  }

  @Post('otp/verify')
  @HttpCode(200)
  @Throttle({ default: { limit: 10, ttl: 60_000 } })
  async verifyOtp(@Body() body: { email?: string; otp?: string }) {
    if (!body?.email || !body?.otp) {
      throw new BadRequestException('Email and OTP are required.');
    }
    return this.quoteService.verifyOtp(body.email, body.otp);
  }

  @Post('submit')
  @HttpCode(200)
  @Throttle({ default: { limit: 15, ttl: 60_000 } })
  @UseInterceptors(
    FilesInterceptor('files', MAX_FILES, {
      storage: memoryStorage(),
      fileFilter: (_req, file, cb) => {
        if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
          return cb(
            new BadRequestException('Only PDF, JPG, and PNG are allowed.'),
            false,
          );
        }
        cb(null, true);
      },
    }),
  )
  async submitQuote(
    @Body() body: QuoteSubmissionPayload,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.quoteService.submitQuote(body, files ?? []);
  }

  @UseGuards(AdminAuthGuard)
  @Get('admin/submissions')
  async getAdminSubmissions(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return this.quoteService.getAdminSubmissions(
      Number(page) || 1,
      Number(limit) || 20,
    );
  }

  @UseGuards(AdminAuthGuard)
  @Get('admin/submissions/:id')
  async getAdminSubmissionById(@Param('id') id: string) {
    return this.quoteService.getAdminSubmissionById(id);
  }
}
