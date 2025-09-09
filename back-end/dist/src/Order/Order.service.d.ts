import { PrismaService } from '../../prisma/prisma.service';
import { OrderDTO } from './Order.DTO';
import { EmailService } from '../Emails/Email.service';
import { NotificationService } from 'src/Notification/Notification.service';
export declare class OrderService {
    private prisma;
    private emailService;
    private notificationService;
    constructor(prisma: PrismaService, emailService: EmailService, notificationService: NotificationService);
    createOrder(orderDto: OrderDTO): Promise<{
        message: string;
        order: {
            Customer: {
                CustomerId: number;
                Cus_Name: string;
                Cus_Email: string;
                Cus_PhoneNumber: string;
                Cus_CompanyName: string | null;
                Cus_Logo: string | null;
                Verify_State: boolean;
                Cus_Password: string;
                Purchase_Goods: string[];
            } | null;
            Designs: ({
                Design: {
                    DesignID: number;
                    Design_Name: string;
                    Design_Image: string[];
                    Design_Description: string;
                    Categories: string[];
                    Design_Colors: string[];
                    Design_BlogPosts: string[];
                    Design_Sizes: string[];
                    Design_CreatedAt: Date;
                    AdminId: number;
                };
            } & {
                id: number;
                orderId: number;
                designId: number;
            })[];
        } & {
            Order_Date: Date;
            Order_Status: string;
            Client_Name: string | null;
            Client_Email: string | null;
            Client_Number: string | null;
            OrderID: number;
            CustomerId: number | null;
        };
    }>;
    getAllOrders(): Promise<({
        Customer: {
            CustomerId: number;
            Cus_Name: string;
            Cus_Email: string;
            Cus_PhoneNumber: string;
            Cus_CompanyName: string | null;
            Cus_Logo: string | null;
            Verify_State: boolean;
            Cus_Password: string;
            Purchase_Goods: string[];
        } | null;
        Designs: ({
            Design: {
                DesignID: number;
                Design_Name: string;
                Design_Image: string[];
                Design_Description: string;
                Categories: string[];
                Design_Colors: string[];
                Design_BlogPosts: string[];
                Design_Sizes: string[];
                Design_CreatedAt: Date;
                AdminId: number;
            };
        } & {
            id: number;
            orderId: number;
            designId: number;
        })[];
    } & {
        Order_Date: Date;
        Order_Status: string;
        Client_Name: string | null;
        Client_Email: string | null;
        Client_Number: string | null;
        OrderID: number;
        CustomerId: number | null;
    })[]>;
    chagetheStates(orderId: number, Status: string): Promise<{
        message: string;
    }>;
    getcustomerORders(Client_Email: string): Promise<({
        Designs: ({
            Design: {
                DesignID: number;
                Design_Name: string;
                Design_Image: string[];
                Design_Description: string;
                Categories: string[];
                Design_Colors: string[];
                Design_BlogPosts: string[];
                Design_Sizes: string[];
                Design_CreatedAt: Date;
                AdminId: number;
            };
        } & {
            id: number;
            orderId: number;
            designId: number;
        })[];
    } & {
        Order_Date: Date;
        Order_Status: string;
        Client_Name: string | null;
        Client_Email: string | null;
        Client_Number: string | null;
        OrderID: number;
        CustomerId: number | null;
    })[]>;
    getOrderById(orderId: number): Promise<{
        Customer: {
            CustomerId: number;
            Cus_Name: string;
            Cus_Email: string;
            Cus_PhoneNumber: string;
            Cus_CompanyName: string | null;
            Cus_Logo: string | null;
            Verify_State: boolean;
            Cus_Password: string;
            Purchase_Goods: string[];
        } | null;
        Designs: ({
            Design: {
                DesignID: number;
                Design_Name: string;
                Design_Image: string[];
                Design_Description: string;
                Categories: string[];
                Design_Colors: string[];
                Design_BlogPosts: string[];
                Design_Sizes: string[];
                Design_CreatedAt: Date;
                AdminId: number;
            };
        } & {
            id: number;
            orderId: number;
            designId: number;
        })[];
    } & {
        Order_Date: Date;
        Order_Status: string;
        Client_Name: string | null;
        Client_Email: string | null;
        Client_Number: string | null;
        OrderID: number;
        CustomerId: number | null;
    }>;
}
