export declare enum EmailTemplate {
    WELCOME = "WELCOME",
    PASSWORD_RESET = "PASSWORD_RESET",
    ORDER_CONFIRMATION = "ORDER_CONFIRMATION"
}
export declare class EmailDTO {
    to: string;
    template: EmailTemplate;
    context?: any;
    body?: string;
}
