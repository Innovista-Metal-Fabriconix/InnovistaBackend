import { Request } from 'express';
import { NotificationService } from './Notification.service';
interface AuthenticatedRequest extends Request {
    user: {
        email: string;
    };
}
export declare class NotificationController {
    private notificationService;
    constructor(notificationService: NotificationService);
    getNotifications(req: AuthenticatedRequest): Promise<{
        NotificationsID: number;
        Date_Timestamp: Date;
        SenderEmail: string;
        Recevied_Emails: string[];
        View_List: string[];
        Notifications_Body: string;
        Notifications_Title: string;
    }[]>;
    readtNotifications(NotificationsID: string, req: AuthenticatedRequest): Promise<{
        message: string;
    }>;
}
export {};
