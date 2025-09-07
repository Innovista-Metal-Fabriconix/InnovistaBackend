import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsArray,
  IsDate,
} from "class-validator";
import { CustomerDTO } from "../Customer/Customer.DTO";
import { DesignDTO } from "../Designs/Designs.DTO";

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

  @IsString()
  @IsNotEmpty()
  Order_Status: string;

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
