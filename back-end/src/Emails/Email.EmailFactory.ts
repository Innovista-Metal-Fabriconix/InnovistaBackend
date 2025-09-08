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
          body: `Hello check the order details ${context.order}.`,
        };

      case EmailTemplate.CUSTOMER_WELCOME:
        return {
          subject: "Welcome to Our Service!",
          template: "customer-welcome",
          context,
          body: `Hello ${context.name},\n\nWelcome to our app! Your temporary password is: ${context.password}\n\nPlease change your password after logging in.`,
        };

      case EmailTemplate.CUSTOMER_REMOVE:
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
