import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { NotificationService } from './Notification.service';
import { NotificationController } from './Notification.controller';


@Module({
  imports: [PrismaModule],
  providers: [NotificationService],
  controllers: [ NotificationController],
  exports: [NotificationService],
})
export class NotificationModule {}
