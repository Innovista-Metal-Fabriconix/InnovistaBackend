import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { EmailModule } from '../Emails/Email.module';
import { AuthenticationModule } from '../Authentication/Authentication.module';
import { QuoteController } from './Quote.controller';
import { QuoteService } from './Quote.service';

@Module({
  imports: [PrismaModule, EmailModule, AuthenticationModule],
  controllers: [QuoteController],
  providers: [QuoteService],
  exports: [QuoteService],
})
export class QuoteModule {}
