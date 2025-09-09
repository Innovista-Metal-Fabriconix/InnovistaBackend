import {
  Body,
  Controller,
  Post,
  UseGuards,
  Query,
  Req,
  Get,
  Delete,
  Put,
} from '@nestjs/common';
import { NotificationService } from './Notification.service';
import { AdminAuthGuard } from '../Authentication/Authentication.AdminAuthgurd';

@Controller('Notification')
export class NotificationController {
  constructor(private notificationService: NotificationService) {}

  @UseGuards(AdminAuthGuard)
  @Get('getalerts')
  async getNotifications(@Req() req) {
    const Adminemail = req.user.email;
    return this.notificationService.getNotifications(Adminemail);
  }

  @UseGuards(AdminAuthGuard)
  @Post('markAsRead')
  async readtNotifications(
    @Query('NotificationsID') NotificationsID: string,
    @Req() req,
  ) {
    const Adminemail = req.user.email;
    return this.notificationService.markAsRead(
      Adminemail,
      parseInt(NotificationsID, 10),
    );
  }
}
