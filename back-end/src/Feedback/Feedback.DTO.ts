import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsArray,
  ArrayNotEmpty,
  IsDate,
  IsEmail,
} from 'class-validator';

export class FeedbackDTO {
  @IsNotEmpty()
  @IsNumber()
  public Feed_backId: number;

  @IsNotEmpty()
  @IsString()
  public Feed_back_comment: string;

  @IsOptional()
  @IsArray()
  public Feed_Back_Images: string[];

  @IsNotEmpty()
  @IsNumber()
  public Rating: number;

  @IsNotEmpty()
  @IsNumber()
  public CustomerId: number;

  @IsNotEmpty()
  @IsNumber()
  public DesignID: number;
}
