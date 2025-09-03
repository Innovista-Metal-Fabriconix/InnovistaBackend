import { Injectable } from "@nestjs/common";
import { MailerService } from "@nestjs-modules/mailer";
import { EmailDTO } from "./Email.DTO";
import { EmailTemplateFactory } from "./Email.EmailFactory";

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendEmail(emailDto: EmailDTO) {
    const { subject, template, context } = EmailTemplateFactory.create(
      emailDto.template,
      emailDto.context,
    );

    await this.mailerService.sendMail({
      to: emailDto.to,
      subject,
      template,
      context,
    });
  }
}
