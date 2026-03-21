import { Subject } from 'rxjs';
import { EmailTemplate } from './Email.DTO';
import { Body } from '@nestjs/common';

export class EmailTemplateFactory {
  static create(template: EmailTemplate, context?: any) {
    switch (template) {
      case EmailTemplate.WELCOME:
        return {
          subject: 'Welcome to Our App!',
          template: 'welcome',
          context,
          bodyText: `Hello ${context.name},

Welcome to our app! Your temporary password is: ${context.password}

Please change your password after logging in.`,
        };

      case EmailTemplate.REQUEST_NEWPASSWORD:
        return {
          subject: 'Your New password',
          template: 'request_newpassword',
          context,
          bodyText: `Hellow  ${context.name},
         Welcome to our app! Your New password is: ${context.newPassword}

         Please change your password after logging in.
          `,
        };

      case EmailTemplate.PASSWORD_RESET:
        return {
          subject: 'Reset Your Password',
          template: 'password-reset',
          context,
          bodyText: `Hello ${context.name},

We received a request to reset your password. Your reset code is: ${context.resetCode}

If you didn’t request this, please ignore this email.`,
        };

      case EmailTemplate.ORDER_CONFIRMATION:
        return {
          subject: 'Your Order is Confirmed',
          template: 'order-confirmation',
          context,
          bodyText: `Hello ${context.name},

Thank you for your order! Here are the details:
${context.order}`,
        };

      case EmailTemplate.CUSTOMER_WELCOME:
        return {
          subject: 'Welcome to Our Service!',
          template: 'customer-welcome',
          context,
          bodyHtml: `<!DOCTYPE html>
<html>
  <body>
    <h2>Welcome to Our Service!</h2>
    <p>Hello ${context.name},</p>
    <p>Welcome to our app! Please verify your account by clicking the button below:</p>

    <a 
      href="${context.Link}" 
      style="display:inline-block;padding:10px 20px;background:#007bff;color:#fff;text-decoration:none;border-radius:5px;"
    >
      Verify Account
    </a>

    <p>If you didn’t create an account, you can safely ignore this email.</p>
  </body>
</html>`,
        };

      case EmailTemplate.CUSTOMER_REMOVE:
        return {
          subject: 'Account Removal Notification',
          template: 'customer-remove',
          context,
          bodyText: `Hello ${context.name},

Your account has been removed from our service. If you have any questions, please contact support.`,
        };

      default:
        throw new Error(`Unknown email template: ${template}`);
    }
  }
}
