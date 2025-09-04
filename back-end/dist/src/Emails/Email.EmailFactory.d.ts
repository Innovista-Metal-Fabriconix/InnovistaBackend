import { EmailTemplate } from "./Email.DTO";
export declare class EmailTemplateFactory {
    static create(template: EmailTemplate, context?: any): {
        subject: string;
        template: string;
        context: any;
    };
}
