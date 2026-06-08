import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { EmailDTO } from './Email.DTO';
import { EmailTemplateFactory } from './Email.EmailFactory';


@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendEmail(emailDto: EmailDTO): Promise<void> {
    if (!emailDto.context) {
      throw new Error('Email context is required for rendering template');
    }
    const result = EmailTemplateFactory.create(
      emailDto.template,
      emailDto.context,
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