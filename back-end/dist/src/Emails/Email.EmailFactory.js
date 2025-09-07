"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailTemplateFactory = void 0;
const Email_DTO_1 = require("./Email.DTO");
class EmailTemplateFactory {
    static create(template, context) {
        switch (template) {
            case Email_DTO_1.EmailTemplate.WELCOME:
                return {
                    subject: "Welcome to Our App!",
                    template: "welcome",
                    context,
                    body: `Hello ${context.name},\n\nWelcome to our app! Your temporary password is: ${context.password}\n\nPlease change your password after logging in.`,
                };
            case Email_DTO_1.EmailTemplate.PASSWORD_RESET:
                return {
                    subject: "Reset Your Password",
                    template: "password-reset",
                    context,
                    body: `Hello ${context.name},\n\nWelcome to our app! Your temporary password is: ${context.password}\n\nPlease change your password after logging in.`,
                };
            case Email_DTO_1.EmailTemplate.ORDER_CONFIRMATION:
                return {
                    subject: "Your Order is Confirmed",
                    template: "order-confirmation",
                    context,
                    body: `Hello ${context.name},\n\nWelcome to our app! Your temporary password is: ${context.password}\n\nPlease change your password after logging in.`,
                };
            case Email_DTO_1.EmailTemplate.CUSTOMER_WELCOME:
                return {
                    subject: "Welcome to Our Service!",
                    template: "customer-welcome",
                    context,
                    body: `Hello ${context.name},\n\nWelcome to our app! Your temporary password is: ${context.password}\n\nPlease change your password after logging in.`,
                };
            case Email_DTO_1.EmailTemplate.CUSTOMER_REMOVE:
                return {
                    subject: "Account Removal Notification",
                    template: "customer-remove",
                    context,
                    body: `Hello ${context.name},\n\nYour account has been removed from our service. If you have any questions, please contact support.`,
                };
            default:
                throw new Error(`Unknown email template: ${template}`);
        }
    }
}
exports.EmailTemplateFactory = EmailTemplateFactory;
//# sourceMappingURL=Email.EmailFactory.js.map