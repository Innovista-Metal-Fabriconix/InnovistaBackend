import { EmailTemplate } from "./Email.DTO";

export class EmailTemplateFactory {
  static create(template: EmailTemplate, context?: any) {
    switch (template) {
      case EmailTemplate.WELCOME:
        return {
          subject: "Welcome to Our App!",
          template: "welcome", 
          context,
          body: `Hello ${context.name},\n\nWelcome to our app! Your temporary password is: ${context.password}\n\nPlease change your password after logging in.`,
        };
      case EmailTemplate.PASSWORD_RESET:
        return {
          subject: "Reset Your Password",
          template: "password-reset",
          context,
           body: `Hello ${context.name},\n\nWelcome to our app! Your temporary password is: ${context.password}\n\nPlease change your password after logging in.`,
        };
      case EmailTemplate.ORDER_CONFIRMATION:
        return {
          subject: "Your Order is Confirmed",
          template: "order-confirmation",
          context,
           body: `Hello ${context.name},\n\nWelcome to our app! Your temporary password is: ${context.password}\n\nPlease change your password after logging in.`,
        };
      default:
        throw new Error(`Unknown email template: ${template}`);
    }
  }
}
