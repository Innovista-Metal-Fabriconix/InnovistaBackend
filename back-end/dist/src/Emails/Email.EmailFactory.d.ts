import { EmailTemplate, EmailContext } from './Email.DTO';
import { EmailTemplateResult } from './Email.EmailTemplateResult';
export declare class EmailTemplateFactory {
    static create(template: EmailTemplate, context: EmailContext): EmailTemplateResult;
}
