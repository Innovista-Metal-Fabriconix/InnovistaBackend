import { PrismaService } from '../../prisma/prisma.service';
import { NotificationDTO } from './Notification.DTO';
export declare class NotificationService {
    private prisma;
    constructor(prisma: PrismaService);
    createNotification(notificationDto: NotificationDTO): Promise<{
        Date_Timestamp: Date;
        SenderEmail: string;
        Recevied_Emails: string[];
        View_List: string[];
        Notifications_Body: string;
        Notifications_Title: string;
        NotificationsID: number;
    }>;
    markAsRead(Adminemail: string, NotificationsID: number): Promise<{
        message: string;
    }>;
    getNotifications(Adminemail: string): Promise<{
        Date_Timestamp: Date;
        SenderEmail: string;
        Recevied_Emails: string[];
        View_List: string[];
        Notifications_Body: string;
        Notifications_Title: string;
        NotificationsID: number;
    }[]>;
}
