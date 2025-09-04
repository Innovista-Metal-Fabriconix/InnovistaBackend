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
                };
            case Email_DTO_1.EmailTemplate.PASSWORD_RESET:
                return {
                    subject: "Reset Your Password",
                    template: "password-reset",
                    context,
                };
            case Email_DTO_1.EmailTemplate.ORDER_CONFIRMATION:
                return {
                    subject: "Your Order is Confirmed",
                    template: "order-confirmation",
                    context,
                };
            default:
                throw new Error(`Unknown email template: ${template}`);
        }
    }
}
exports.EmailTemplateFactory = EmailTemplateFactory;
//# sourceMappingURL=Email.EmailFactory.js.map