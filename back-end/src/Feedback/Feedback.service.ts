import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { FeedbackDTO } from './Feedback.DTO';

@Injectable()
export class FeedbackService {
  constructor(private prisma: PrismaService) {}


  async accesschecktoCustomer(customerEmail: string) {
    try{
      const customer = await this.prisma.customer.findUnique({
        where: { Cus_Email: customerEmail },
      });
      if (!customer) {
        throw new UnauthorizedException('Customer not found');
      }
      return { message: 'Access granted', customerId: customer.CustomerId };

  } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      throw new BadRequestException('Error retrieving projects: ' + message);
    }
  }

  async createFeedback(feedbackDto: FeedbackDTO) {
    try {
      const checkCustomer = await this.prisma.customer.findUnique({
        where: { CustomerId: feedbackDto.CustomerId },
      });
      if (!checkCustomer) {
        throw new UnauthorizedException('Customer not found');
      }
      const checkDesign = await this.prisma.design.findUnique({
        where: { DesignID: feedbackDto.DesignID },
      });
      if (!checkDesign) {
        throw new UnauthorizedException('Design not found');
      }

      const feedback = await this.prisma.feed_Back.create({
        data: {
          Feed_back_comment: feedbackDto.Feed_back_comment,
          Feed_Back_Images: feedbackDto.Feed_Back_Images,
          Rating: feedbackDto.Rating,
          CustomerId: feedbackDto.CustomerId,
          DesignID: feedbackDto.DesignID,
        },
      });
      return { message: 'Feedback submitted successfully', feedback };
  } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      throw new BadRequestException('Error retrieving projects: ' + message);
    }
  }

  async getAllFeedbacks() {
    try {
      const feedbacks = await this.prisma.feed_Back.findMany({
        include: {
          Design: true,
          Customer: true,
        },
      });
      return feedbacks;
  } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      throw new BadRequestException('Error retrieving projects: ' + message);
    }
  }

  async deleteFeedback(feedbackId: number, AdminId: number) {
    try {
      const admin = await this.prisma.admin.findUnique({
        where: { AdminId: AdminId },
      });

      if (!admin) {
        throw new UnauthorizedException('Admin not found');
      }
      const feedback = await this.prisma.feed_Back.delete({
        where: { Feed_backId: feedbackId },
      });
      return { message: 'Feedback deleted successfully', feedback };
  } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      throw new BadRequestException('Error retrieving projects: ' + message);
    }
  }

  async getfeedbackByDesignId(designId: number) {
    try {
      const feedbacks = await this.prisma.feed_Back.findMany({
        where: { DesignID: designId },
        include: {
          Customer: true,
          Design: true,
        },
      });
      return feedbacks;
   } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      throw new BadRequestException('Error retrieving projects: ' + message);
    }
  }
}
