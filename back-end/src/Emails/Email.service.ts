import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { EmailDTO } from './Email.DTO';
import { EmailTemplateFactory } from './Email.EmailFactory';


@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

async sendEmail(emailDto: EmailDTO): Promise<void> {
  const result = EmailTemplateFactory.create(
    emailDto.template,
    emailDto.context as any, // or better validation before calling
  );

  const { subject, template, context, bodyText, bodyHtml } = result;

  await this.mailerService.sendMail({
    to: emailDto.to,
    subject,
    template,
    context,
    text: bodyText,
    html: bodyHtml,
  });
}
}