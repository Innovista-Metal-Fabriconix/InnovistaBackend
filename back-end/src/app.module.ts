import { Module } from '@nestjs/common';
import { AuthenticationModule } from './Authentication/Authentication.module';
import { EmailModule } from './Emails/Email.module';


@Module({
  imports: [ AuthenticationModule , EmailModule],
})
export class AppModule {}
