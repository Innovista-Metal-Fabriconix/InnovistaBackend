import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEmail,
  IsEnum,
} from 'class-validator';

export enum EmailTemplate {
  WELCOME = 'WELCOME',
  PASSWORD_RESET = 'PASSWORD_RESET',
  ORDER_CONFIRMATION = 'ORDER_CONFIRMATION',
  CUSTOMER_WELCOME = 'CUSTOMER_WELCOME',
  CUSTOMER_REMOVE = 'CUSTOMER_REMOVE',
  REQUEST_NEWPASSWORD = 'REQUEST_NEWPASSWORD',
  QUOTE_OTP = 'QUOTE_OTP',
  QUOTE_NOTIFICATION = 'QUOTE_NOTIFICATION',
}

// ✅ Strong typing instead of `any`
export type EmailContext =
  | { name: string; password: string }
  | { name: string; newPassword: string }
  | { name: string; resetCode: string }
  | { name: string; order: string }
  | { name: string; Link: string }
  | { name: string }
  | { name: string; otpCode: string }
  | {
      name: string;
      quoteId: string;
      email: string;
      phone: string;
      projectTitle: string;
      fileLinks: string[];
    };

export class EmailDTO {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  to!: string;

  @IsEnum(EmailTemplate)
  template!: EmailTemplate;

  @IsOptional()
  context?: EmailContext;

  @IsOptional()
  body?: string;
}