export declare enum EmailTemplate {
    WELCOME = "WELCOME",
    PASSWORD_RESET = "PASSWORD_RESET",
    ORDER_CONFIRMATION = "ORDER_CONFIRMATION",
    CUSTOMER_WELCOME = "CUSTOMER_WELCOME",
    CUSTOMER_REMOVE = "CUSTOMER_REMOVE"
}
export declare class EmailDTO {
    to: string;
    template: EmailTemplate;
    context?: any;
    body?: string;
}
