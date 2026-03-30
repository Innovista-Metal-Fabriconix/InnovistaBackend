import { PrismaService } from '../../prisma/prisma.service';
import { OrderDTO } from './Order.DTO';
import { EmailService } from '../Emails/Email.service';
import { NotificationService } from '../Notification/Notification.service';
export declare class OrderService {
    private prisma;
    private emailService;
    private notificationService;
    constructor(prisma: PrismaService, emailService: EmailService, notificationService: NotificationService);
    createOrder(orderDto: OrderDTO): Promise<{
        message: string;
        order: {
            Designs: ({
                Design: {
                    AdminId: number;
                    DesignID: number;
                    Design_Name: string;
                    Design_Image: string[];
                    Design_Description: string;
                    Categories: string[];
                    Design_Colors: string[];
                    Design_BlogPosts: string[];
                    Design_Sizes: string[];
                    Design_CreatedAt: Date;
                };
            } & {
                id: number;
                designId: number;
                orderId: number;
            })[];
            Customer: {
                CustomerId: number;
                Cus_Name: string;
                Cus_Email: string;
                Cus_PhoneNumber: string;
                Cus_CompanyName: string | null;
                Cus_Logo: string | null;
                Cus_Password: string;
                Purchase_Goods: string[];
                Verify_State: boolean;
            } | null;
        } & {
            CustomerId: number | null;
            OrderID: number;
            Order_Date: Date;
            Order_Status: string;
            Client_Name: string | null;
            Client_Email: string | null;
            Client_Number: string | null;
        };
    }>;
    getAllOrders(page: number, limit: number): Promise<{
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        data: ({
            Designs: ({
                Design: {
                    AdminId: number;
                    DesignID: number;
                    Design_Name: string;
                    Design_Image: string[];
                    Design_Description: string;
                    Categories: string[];
                    Design_Colors: string[];
                    Design_BlogPosts: string[];
                    Design_Sizes: string[];
                    Design_CreatedAt: Date;
                };
            } & {
                id: number;
                designId: number;
                orderId: number;
            })[];
            Customer: {
                CustomerId: number;
                Cus_Name: string;
                Cus_Email: string;
                Cus_PhoneNumber: string;
                Cus_CompanyName: string | null;
                Cus_Logo: string | null;
                Cus_Password: string;
                Purchase_Goods: string[];
                Verify_State: boolean;
            } | null;
        } & {
            CustomerId: number | null;
            OrderID: number;
            Order_Date: Date;
            Order_Status: string;
            Client_Name: string | null;
            Client_Email: string | null;
            Client_Number: string | null;
        })[];
    }>;
    chagetheStates(orderId: number, Status: string): Promise<{
        message: string;
    }>;
    getcustomerORders(Client_Email: string): Promise<({
        Designs: ({
            Design: {
                AdminId: number;
                DesignID: number;
                Design_Name: string;
                Design_Image: string[];
                Design_Description: string;
                Categories: string[];
                Design_Colors: string[];
                Design_BlogPosts: string[];
                Design_Sizes: string[];
                Design_CreatedAt: Date;
            };
        } & {
            id: number;
            designId: number;
            orderId: number;
        })[];
    } & {
        CustomerId: number | null;
        OrderID: number;
        Order_Date: Date;
        Order_Status: string;
        Client_Name: string | null;
        Client_Email: string | null;
        Client_Number: string | null;
    })[]>;
    getOrderById(orderId: number): Promise<{
        Designs: ({
            Design: {
                AdminId: number;
                DesignID: number;
                Design_Name: string;
                Design_Image: string[];
                Design_Description: string;
                Categories: string[];
                Design_Colors: string[];
                Design_BlogPosts: string[];
                Design_Sizes: string[];
                Design_CreatedAt: Date;
            };
        } & {
            id: number;
            designId: number;
            orderId: number;
        })[];
        Customer: {
            CustomerId: number;
            Cus_Name: string;
            Cus_Email: string;
            Cus_PhoneNumber: string;
            Cus_CompanyName: string | null;
            Cus_Logo: string | null;
            Cus_Password: string;
            Purchase_Goods: string[];
            Verify_State: boolean;
        } | null;
    } & {
        CustomerId: number | null;
        OrderID: number;
        Order_Date: Date;
        Order_Status: string;
        Client_Name: string | null;
        Client_Email: string | null;
        Client_Number: string | null;
    }>;
}
