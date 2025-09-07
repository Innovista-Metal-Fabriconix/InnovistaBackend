import { Module } from '@nestjs/common';
import { AuthenticationModule } from './Authentication/Authentication.module';
import { EmailModule } from './Emails/Email.module';
import { DesignsModule } from './Designs/Designs.module';
import { CustomerModule } from './Customer/Customer.module';
import { FeedbackModule } from './Feedback/Feedback.module';
import { OrderModule } from './Order/Order.module';

@Module({
  imports: [
    AuthenticationModule,
    EmailModule,
    DesignsModule,
    CustomerModule,
    FeedbackModule,
    OrderModule,
  ],
})
export class AppModule {}
