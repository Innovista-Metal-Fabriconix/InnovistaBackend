import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEmail,
  IsEnum,
} from "class-validator";

export enum EmailTemplate {
  WELCOME = "WELCOME",
  PASSWORD_RESET = "PASSWORD_RESET",
  ORDER_CONFIRMATION = "ORDER_CONFIRMATION",
}

export class EmailDTO {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  to: string;

  @IsEnum(EmailTemplate)
  template: EmailTemplate;

  @IsOptional()
  context?: any;

  @IsOptional()
  body?: string;
}
