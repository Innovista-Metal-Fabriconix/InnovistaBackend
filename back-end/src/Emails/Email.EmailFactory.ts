import { EmailTemplate, EmailContext } from './Email.DTO';
import { EmailTemplateResult } from './Email.EmailTemplateResult';

export class EmailTemplateFactory {
  static create(
    template: EmailTemplate,
    context: EmailContext,
  ): EmailTemplateResult {
    switch (template) {
      case EmailTemplate.WELCOME: {
        const ctx = context as { name: string; password: string };

        return {
          subject: '🎉 Welcome to Our App!',
          template: 'welcome',
          context,
          bodyText: `Hi ${ctx.name},

Welcome to our platform — we're excited to have you onboard! 🎉

Here are your temporary login details:
Password: ${ctx.password}

🔐 For your security, please change your password immediately after logging in.

If you need any help, feel free to reach out.

Best regards,
The Team`,
        };
      }

      case EmailTemplate.REQUEST_NEWPASSWORD: {
        const ctx = context as { name: string; newPassword: string };

        return {
          subject: '🔑 Your New Password',
          template: 'request_newpassword',
          context,
          bodyText: `Hi ${ctx.name},

Your password has been successfully reset.

New Password: ${ctx.newPassword}

⚠️ Please log in and change this password as soon as possible to keep your account secure.

If you did not request this change, contact support immediately.

Stay safe,  
Support Team`,
        };
      }

      case EmailTemplate.PASSWORD_RESET: {
        const ctx = context as { name: string; resetCode: string };

        return {
          subject: '🔐 Password Reset Request',
          template: 'password-reset',
          context,
          bodyText: `Hi ${ctx.name},

We received a request to reset your password.

Use the verification code below to proceed:
Reset Code: ${ctx.resetCode}

⏳ This code may expire soon for security reasons.

If you didn’t request this, you can safely ignore this email.

Best regards,  
Security Team`,
        };
      }

      case EmailTemplate.ORDER_CONFIRMATION: {
        const ctx = context as { name: string; order: string };

        return {
          subject: '🛒 Order Confirmed!',
          template: 'order-confirmation',
          context,
          bodyText: `Hi ${ctx.name},

Thank you for your purchase! 🎉

Your order has been successfully confirmed. Here are the details:

${ctx.order}

We’ll notify you once your order is on the way.

Thanks for shopping with us!  
Customer Support`,
        };
      }

      case EmailTemplate.CUSTOMER_WELCOME: {
        const ctx = context as { name: string; Link: string };

        return {
          subject: '✨ Welcome! Please Verify Your Account',
          template: 'customer-welcome',
          context,
          bodyHtml: `<!DOCTYPE html>
<html>
  <body style="font-family: Arial, sans-serif; background:#f4f6f8; padding:20px;">
    <div style="max-width:500px; margin:auto; background:white; padding:20px; border-radius:10px;">
      
      <h2 style="color:#333;">Welcome, ${ctx.name}! 🎉</h2>
      
      <p>We're excited to have you join us.</p>
      
      <p>Please verify your account to get started:</p>

      <div style="text-align:center; margin:20px 0;">
        <a href="${ctx.Link}" 
           style="background:#4CAF50; color:white; padding:12px 20px; text-decoration:none; border-radius:5px;">
          Verify Account
        </a>
      </div>

      <p>If you didn’t create this account, you can safely ignore this email.</p>

      <p style="margin-top:30px;">Cheers,<br/>The Team</p>
    </div>
  </body>
</html>`,
        };
      }

      case EmailTemplate.CUSTOMER_REMOVE: {
        const ctx = context as { name: string };

        return {
          subject: '⚠️ Account Removed',
          template: 'customer-remove',
          context,
          bodyText: `Hi ${ctx.name},

We're sorry to inform you that your account has been removed from our system.

If you believe this was a mistake or need assistance, please contact our support team.

Thank you for being with us.

Best regards,  
Support Team`,
        };
      }

      default:
        throw new Error(`Unknown email template`);
    }
  }
}
