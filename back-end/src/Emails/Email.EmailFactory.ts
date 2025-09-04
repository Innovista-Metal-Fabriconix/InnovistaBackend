import { EmailTemplate } from "./Email.DTO";

export class EmailTemplateFactory {
  static create(template: EmailTemplate, context?: any) {
    switch (template) {
      case EmailTemplate.WELCOME:
        return {
          subject: "Welcome to Our App!",
          template: "welcome", 
          context,
        };
      case EmailTemplate.PASSWORD_RESET:
        return {
          subject: "Reset Your Password",
          template: "password-reset",
          context,
        };
      case EmailTemplate.ORDER_CONFIRMATION:
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
