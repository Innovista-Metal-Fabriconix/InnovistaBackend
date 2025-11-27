import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEmail,
} from "class-validator";

export class AuthDTO {

    @IsNotEmpty()
    @IsString()
    public Admin_Name: string;

    @IsNotEmpty()
    @IsEmail()
    public Admin_Email: string;

    @IsNotEmpty()
    @IsString()
    public Admin_Phone: string;

    @IsOptional()
    @IsString()
    public Admin_Profile: string;


}

export class ChangepasswordDTO{

    @IsNotEmpty()
    @IsString()
    public Admin_Password: string;

    @IsNotEmpty()
    @IsEmail()
    public Admin_Email: string;
}