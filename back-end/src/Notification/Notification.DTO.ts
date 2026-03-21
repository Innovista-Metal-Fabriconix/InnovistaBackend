import {
    IsDate,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    MaxLength,
} from 'class-validator';


export class NotificationDTO {
    @IsOptional()
    @IsNumber()
    NotificationsID?: number;

    @IsOptional()
    @IsDate()
    Date_Timestamp?: Date;

    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    SenderEmail: string;

    @IsNotEmpty()
    @IsString()
    Recevied_Emails: string[];

    @IsOptional()
    @IsString()
    View_List?: string[];

    @IsNotEmpty()
    @IsString()
    Notifications_Body: string;

    @IsNotEmpty()
    @IsString()
    Notifications_Title: string;
}