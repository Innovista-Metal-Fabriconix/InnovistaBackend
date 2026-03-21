export declare enum EmailTemplate {
    WELCOME = "WELCOME",
    PASSWORD_RESET = "PASSWORD_RESET",
    ORDER_CONFIRMATION = "ORDER_CONFIRMATION",
    CUSTOMER_WELCOME = "CUSTOMER_WELCOME",
    CUSTOMER_REMOVE = "CUSTOMER_REMOVE",
    REQUEST_NEWPASSWORD = "REQUEST_NEWPASSWORD"
}
export type EmailContext = {
    name: string;
    password: string;
} | {
    name: string;
    newPassword: string;
} | {
    name: string;
    resetCode: string;
} | {
    name: string;
    order: string;
} | {
    name: string;
    Link: string;
} | {
    name: string;
};
export declare class EmailDTO {
    to: string;
    template: EmailTemplate;
    context?: EmailContext;
    body?: string;
}
