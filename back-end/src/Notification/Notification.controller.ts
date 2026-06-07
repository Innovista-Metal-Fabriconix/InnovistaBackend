import {
  Controller,
  Post,
  UseGuards,
  Query,
  Req,
  Get,
} from '@nestjs/common';
import { Request } from 'express';
import { NotificationService } from './Notification.service';
import { AdminAuthGuard } from '../Authentication/Authentication.AdminAuthgurd';


interface AuthenticatedRequest extends Request {
  user: {
    email: string;
  };
}

@Controller('Notification')
export class NotificationController {
  constructor(private notificationService: NotificationService) {}

  @UseGuards(AdminAuthGuard)
  @Get('getalerts')
  async getNotifications(@Req() req: AuthenticatedRequest) {
    const Adminemail = req.user.email;

    return this.notificationService.getNotifications(Adminemail);
  }

  @UseGuards(AdminAuthGuard)
  @Post('markAsRead')
  async readtNotifications(
    @Query('NotificationsID') NotificationsID: string,
    @Req() req: AuthenticatedRequest,
  ) {
    const Adminemail = req.user.email;

    return this.notificationService.markAsRead(
      Adminemail,
      parseInt(NotificationsID, 10),
    );
  }
}
