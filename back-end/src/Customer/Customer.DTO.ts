import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsEmail,
  IsBoolean,
  IsArray,
} from "class-validator";

export class CustomerDTO {


    @IsNotEmpty()
    @IsNumber()
    public CustomerId!: number;

    @IsNotEmpty()
    @IsString()
    public Cus_Name!: string;

    @IsNotEmpty()
    @IsEmail()
    public Cus_Email!: string;

    @IsNotEmpty()
    @IsString()
    public Cus_PhoneNumber!: string;

    @IsOptional()
    @IsString()
    public Cus_CompanyName!: string;

    @IsOptional()
    @IsString()
    public Cus_Logo!: string;

    @IsNotEmpty()
    @IsString()
    public Cus_Password!: string;

    @IsOptional()
    @IsArray()
    public Purchase_Goods!: string[];

}

export class UpdateCustomer{

    @IsNotEmpty()
    @IsNumber()
    public CustomerId!: number;

    @IsNotEmpty()
    @IsString()
    public Cus_Name!: string;

    @IsNotEmpty()
    @IsEmail()
    public Cus_Email!: string;

    @IsNotEmpty()
    @IsString()
    public Cus_PhoneNumber!: string;

    @IsOptional()
    @IsString()
    public Cus_CompanyName!: string;

    @IsOptional()
    @IsString()
    public Cus_Logo!: string;

    @IsNotEmpty()
    @IsString()
    public Cus_Password?: string;

    @IsBoolean()
    public Verify_State?: boolean;

    @IsOptional()
    @IsArray()
    public Purchase_Goods!: string[];
}