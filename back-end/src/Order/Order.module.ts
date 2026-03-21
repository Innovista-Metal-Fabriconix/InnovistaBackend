import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { OrderService } from './Order.service';
import { OrderController } from './Order.controller'; 
import { EmailModule } from '../Emails/Email.module';
import { NotificationModule } from '../Notification/Notification.module';

@Module({
  imports: [PrismaModule, EmailModule, NotificationModule],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
