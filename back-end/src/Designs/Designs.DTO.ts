import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsArray,
  ArrayNotEmpty,
  IsNumber,
  IsDate,
} from "class-validator";



export class DesignDTO {
    @IsNumber()
    @IsNotEmpty()
    public DesignID?: number;

    @IsString()
    @IsNotEmpty()
    public Design_Name: string;

    @IsArray()
    @ArrayNotEmpty()
    public Design_Image: string[];

    @IsString()
    @IsNotEmpty()
    public Design_Description: string;

    @IsArray()
    @ArrayNotEmpty()
    public Categories: string[];

    @IsArray()
    @ArrayNotEmpty()
    public Design_Colors: string[];

    @IsArray()
    @ArrayNotEmpty()
    public Design_BlogPosts: string[];

    @IsArray()
    @ArrayNotEmpty()
    public Design_Sizes: string[];

    @IsOptional()
    @IsDate()
    public Design_CreatedAt?: Date;


}
