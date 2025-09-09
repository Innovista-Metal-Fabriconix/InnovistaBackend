import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { OrderService } from './Order.service';
import { OrderController } from './Order.controller'; 
import { EmailModule } from 'src/Emails/Email.module';
import { NotificationModule } from 'src/Notification/Notification.module';

@Module({
  imports: [PrismaModule, EmailModule, NotificationModule],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
