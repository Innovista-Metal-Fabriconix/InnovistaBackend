import { Body, Query, Post, Get, Delete, Put, Req } from '@nestjs/common';
import { Controller, UseGuards } from '@nestjs/common';
import { FeedbackDTO } from './Feedback.DTO';
import { FeedbackService } from './Feedback.service';
import { AdminAuthGuard } from '../Authentication/Authentication.AdminAuthgurd';

@Controller('feedback')
export class FeedbackController {
  constructor(private feedbackService: FeedbackService) {}

  @Post('AccessToCustomer')
  async accesschecktoCustomer(@Query('customerEmail') customerEmail: string) {
    return this.feedbackService.accesschecktoCustomer(customerEmail);
  }

  @Post('createFeedback')
  async createFeedback(@Body() feedbackDto: FeedbackDTO) {
    return this.feedbackService.createFeedback(feedbackDto);
  }

  @Get('allFeedbacks')
  async getAllFeedbacks() {
    return this.feedbackService.getAllFeedbacks();
  }

  @UseGuards(AdminAuthGuard)
  @Delete('deleteFeedback')
  async deleteFeedback(@Query('feedbackId') feedbackId: string, @Req() req) {
    const AdminId = req.user.userId;
    return this.feedbackService.deleteFeedback(
      parseInt(feedbackId, 10),
      AdminId,
    );
  }

  @Get('feedbackByDesignId')
  async getFeedbackByDesignId(@Query('designId') designId: string) {
    return this.feedbackService.getfeedbackByDesignId(parseInt(designId, 10));
  }
}
