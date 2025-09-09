import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { NotificationDTO } from './Notification.DTO';

@Injectable()
export class NotificationService {
  constructor(private prisma: PrismaService) {}

  async createNotification(notificationDto: NotificationDTO) {
    try {
      const notification = await this.prisma.notifications.create({
        data: {
          SenderEmail: notificationDto.SenderEmail,
          Recevied_Emails: notificationDto.Recevied_Emails,
          View_List: notificationDto.View_List || [],
          Notifications_Body: notificationDto.Notifications_Body,
          Notifications_Title: notificationDto.Notifications_Title,
          Date_Timestamp: notificationDto.Date_Timestamp || new Date(),
        },
      });
      return notification;
    } catch (error) {
      console.error('Prisma error:', error);
      throw new Error('Failed to create notification: ' + error.message);
    }
  }

  async markAsRead(Adminemail: string, NotificationsID: number) {
    try {
      const notification = await this.prisma.notifications.findUnique({
        where: { NotificationsID: NotificationsID },
      });

      if (!notification) {
        throw new Error('Notification not found');
      }
      const updatedViewList = notification.View_List || [];
      if (!updatedViewList.includes(Adminemail)) {
        updatedViewList.push(Adminemail);
      }

      await this.prisma.notifications.update({
        where: { NotificationsID: NotificationsID },
        data: { View_List: updatedViewList },
      });
      return { message: 'Notification view succesfully' };
    } catch (error) {
      console.error('Prisma error:', error);
      throw new Error('Failed to mark notification as read: ' + error.message);
    }
  }

  async getNotifications(Adminemail: string) {
    try {
      const notifications = await this.prisma.notifications.findMany({
        where: {
          NOT: {
            View_List: {
              has: Adminemail,
            },
          },
        },
      });

      return notifications;
    } catch (error) {
      console.error('Prisma error:', error);
      throw new Error('Failed to get notifications: ' + error.message);
    }
  }
}
