import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsArray,
  IsDate,
} from 'class-validator';


export class ProjectDTO {
    @IsNumber()
    @IsOptional()
    ProjectID?: number;

    @IsString()
    @IsNotEmpty()
    Project_Title : string;

    @IsString()
    @IsNotEmpty()
    Project_Description: string;

    @IsArray()
    @IsOptional()
    Project_Images?: string[];

    @IsDate()
    @IsOptional()
    Project_CreatedAt?: Date;

    @IsString()
    @IsNotEmpty()
    Location: string;

    @IsString()
    @IsNotEmpty()
    Client_Name: string;

    @IsEmail()
    @IsNotEmpty()
    Client_Email: string;

    @IsString()
    @IsOptional()
    Client_Number?: string;

    @IsString()
    @IsOptional()
    Client_Company?: string;

    @IsDate()
    @IsOptional()
    Project_FinishedDate?: Date;

    @IsNumber()
    @IsNotEmpty()
    Budget: number;

}