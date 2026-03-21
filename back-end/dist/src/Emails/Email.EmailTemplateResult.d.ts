export interface EmailTemplateResult {
    subject: string;
    template: string;
    context?: Record<string, unknown>;
    bodyText?: string;
    bodyHtml?: string;
}
