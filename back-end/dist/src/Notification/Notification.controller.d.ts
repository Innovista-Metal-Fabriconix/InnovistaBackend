import { NotificationService } from './Notification.service';
export declare class NotificationController {
    private notificationService;
    constructor(notificationService: NotificationService);
    getNotifications(req: any): Promise<{
        Date_Timestamp: Date;
        SenderEmail: string;
        Recevied_Emails: string[];
        View_List: string[];
        Notifications_Body: string;
        Notifications_Title: string;
        NotificationsID: number;
    }[]>;
    readtNotifications(NotificationsID: string, req: any): Promise<{
        message: string;
    }>;
}
