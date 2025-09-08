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
import { NotificationDTO } from './Notification.DTO';

@Controller('Notification')
export class NotificationController {
  constructor(private notificationService: NotificationService) {}

  @Get()
  async getNotifications() {
    return this.notificationService.getNotifications();
  }
}
