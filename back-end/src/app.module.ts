import { Module } from '@nestjs/common';
import { AuthenticationModule } from './Authentication/Authentication.module';
import { EmailModule } from './Emails/Email.module';
import { DesignsModule } from './Designs/Designs.module';
import { CustomerModule } from './Customer/Customer.module';
import { FeedbackModule } from './Feedback/Feedback.module';
import { OrderModule } from './Order/Order.module';
import { NotificationModule } from './Notification/Notification.module';
import { ProjectsModule } from './Projects/Projects.module';
import { DebugController } from './Debug.controller';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from './AllExceptions.filter';

@Module({
  imports: [
    AuthenticationModule,
    EmailModule,
    DesignsModule,
    CustomerModule,
    FeedbackModule,
    OrderModule,
    NotificationModule,
    ProjectsModule
  ],
  controllers: [DebugController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}