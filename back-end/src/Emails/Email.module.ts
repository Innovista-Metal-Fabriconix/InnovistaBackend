import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { EmailService } from './Email.service';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: process.env.MAIL_HOST,
        port: parseInt(process.env.MAIL_PORT || '587'),
        secure: false,
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS,
        },
        tls: {
          rejectUnauthorized: false,
        },
      },
      defaults: {
        from: `"Innovista" <${process.env.MAIL_FROM}>`,
      },
    }),
  ],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
