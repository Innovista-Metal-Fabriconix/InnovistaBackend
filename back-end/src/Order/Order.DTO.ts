// Order.DTO.ts
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsArray,
  IsDate,
  IsEnum,
} from 'class-validator';
import { CustomerDTO } from '../Customer/Customer.DTO';
import { DesignDTO } from '../Designs/Designs.DTO';

export enum OrderStatus {
  PENDING = 'PENDING',
  SEND = 'SEND',
  VIEWORDER = 'VIEWORDER',
  COMPLETED = 'COMPLETED',
}

export class OrderDTO {
  @IsNumber()
  @IsOptional()
  OrderID?: number;

  @IsNumber()
  @IsOptional()
  CustomerId?: number;

  @IsDate()
  @IsOptional()
  Order_Date?: Date;

  @IsEnum(OrderStatus)
  @IsNotEmpty()
  Order_Status: OrderStatus;

  @IsString()
  @IsOptional()
  Client_Name?: string;

  @IsEmail()
  @IsOptional()
  Client_Email?: string;

  @IsString()
  @IsOptional()
  Client_Number?: string;

  @IsOptional()
  Customer?: CustomerDTO;

  @IsArray()
  @IsOptional()
  Designs?: DesignDTO[];
}
