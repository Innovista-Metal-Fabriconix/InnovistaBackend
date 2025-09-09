import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { OrderDTO } from './Order.DTO';
import { EmailService } from '../Emails/Email.service';
import { EmailTemplate } from '../Emails/Email.DTO';
import { NotificationService } from 'src/Notification/Notification.service';

@Injectable()
export class OrderService {
  constructor(
    private prisma: PrismaService,
    private emailService: EmailService,
    private notificationService: NotificationService,
  ) {}

  async createOrder(orderDto: OrderDTO) {
    try {
      const findCustomer = await this.prisma.customer.findUnique({
        where: { Cus_Email: orderDto.Client_Email },
      });

      const orderData: any = {
        Order_Status: orderDto.Order_Status,
        Order_Date: orderDto.Order_Date ?? new Date(),
        Client_Name: orderDto.Client_Name,
        Client_Email: orderDto.Client_Email,
        Client_Number: orderDto.Client_Number,
        CustomerId: findCustomer ? findCustomer.CustomerId : null,

        Designs: {
          create:
            orderDto.Designs?.map((d) => ({
              designId: d.DesignID,
            })) || [],
        },
      };

      const order = await this.prisma.order.create({
        data: orderData,
        include: {
          Customer: true,
          Designs: {
            include: {
              Design: true,
            },
          },
        },
      });

      this.notificationService.createNotification({
        SenderEmail: 'innovista.itdep@gmail.com',
        Recevied_Emails: [order.Client_Email ?? ''],
        Notifications_Body: 'Your order has been created successfully.',
        Notifications_Title: 'Order Confirmation',
      });

      this.emailService.sendEmail({
        to: order.Client_Email ?? '',
        template: EmailTemplate.ORDER_CONFIRMATION,
        context: {
          order: order,
        },
      });

      return { message: 'Order created successfully', order };
    } catch (error) {
      console.error('Prisma error:', error);
      throw new BadRequestException('Failed to create order: ' + error.message);
    }
  }

  async getAllOrders() {
    try {
      const orders = await this.prisma.order.findMany({
        include: {
          Customer: true,
          Designs: {
            include: {
              Design: true,
            },
          },
        },
      });
      return orders;
    } catch (error) {
      console.error('Prisma error:', error);
      throw new BadRequestException(
        'Failed to retrieve orders: ' + error.message,
      );
    }
  }

  async chagetheStates(orderId: number, Status: string) {
    try {
      const findOrder = await this.prisma.order.findUnique({
        where: { OrderID: orderId },
      });
      if (!findOrder) {
        throw new BadRequestException("Order details can't find");
      }

      await this.prisma.order.update({
        where: { OrderID: orderId },
        data: { Order_Status: Status },
      });

      return { message: `Change States to ${Status}` };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async getcustomerORders(Client_Email: string) {
    try {
      const findCustomer = await this.prisma.customer.findUnique({
        where: { Cus_Email: Client_Email },
      });

      const findOrders = await this.prisma.order.findMany({
        where: { Client_Email: Client_Email },
        include: {
          Designs: {
            include: {
              Design: true,
            },
          },
        },
      });

      return findOrders;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async getOrderById(orderId: number) {
    try {
      const order = await this.prisma.order.findUnique({
        where: { OrderID: orderId },
        include: {
          Customer: true,
          Designs: {
            include: {
              Design: true,
            },
          },
        },
      });

      if (!order) {
        throw new BadRequestException('Order not found');
      }

      this.emailService.sendEmail({
        to: order.Client_Email ?? '',
        template: EmailTemplate.ORDER_CONFIRMATION,
        context: {
          order: order,
        },
      });

      return order;
    } catch (error) {
      console.error('Prisma error:', error);
      throw new BadRequestException(
        'Failed to retrieve order: ' + error.message,
      );
    }
  }
}
