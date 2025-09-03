import { MailerService } from "@nestjs-modules/mailer";
import { EmailDTO } from "./Email.DTO";
export declare class EmailService {
    private readonly mailerService;
    constructor(mailerService: MailerService);
    sendEmail(emailDto: EmailDTO): Promise<void>;
}
