import { Module } from '@nestjs/common';
import { AuthenticationModule } from './Authentication/Authentication.module';
import { EmailModule } from './Emails/Email.module';
import { DesignsModule } from './Designs/Designs.module';


@Module({
  imports: [ AuthenticationModule , EmailModule, DesignsModule],
})
export class AppModule {}
