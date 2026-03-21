import { Body, Query, Post, Get, Delete, Req } from '@nestjs/common';
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
  async getAllFeedbacks(
    @Query('page') page: string,
    @Query('limit') limit: string,
  ) {
    return this.feedbackService.getAllFeedbacks(
      Number(page) || 1,
      Number(limit) || 10,
    );
  }

  @UseGuards(AdminAuthGuard)
  @Delete('deleteFeedback')
  async deleteFeedback(
    @Query('feedbackId') feedbackId: string,
    @Req() req: { user?: { userId?: string } },
  ) {
    const AdminId = req.user?.userId;
    if (!AdminId) {
      throw new Error('AdminId is missing');
    }
    return this.feedbackService.deleteFeedback(
      parseInt(feedbackId, 10),
      parseInt(AdminId, 10),
    );
  }

  @Get('feedbackByDesignId')
  async getFeedbackByDesignId(@Query('designId') designId: string) {
    return this.feedbackService.getfeedbackByDesignId(parseInt(designId, 10));
  }
}
