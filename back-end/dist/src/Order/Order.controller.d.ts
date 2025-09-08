import { OrderDTO } from "./Order.DTO";
import { OrderService } from "./Order.service";
export declare class OrderController {
    private orderService;
    constructor(orderService: OrderService);
    createOrder(orderDto: OrderDTO): Promise<{
        message: string;
        order: {
            Customer: {
                CustomerId: number;
                Cus_Email: string;
                Cus_Name: string;
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
            CustomerId: number | null;
            Order_Date: Date;
            Order_Status: string;
            Client_Name: string | null;
            Client_Email: string | null;
            Client_Number: string | null;
            OrderID: number;
        };
    }>;
    getAllOrders(): Promise<({
        Customer: {
            CustomerId: number;
            Cus_Email: string;
            Cus_Name: string;
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
        CustomerId: number | null;
        Order_Date: Date;
        Order_Status: string;
        Client_Name: string | null;
        Client_Email: string | null;
        Client_Number: string | null;
        OrderID: number;
    })[]>;
    getOrderById(orderId: string): Promise<{
        Customer: {
            CustomerId: number;
            Cus_Email: string;
            Cus_Name: string;
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
        CustomerId: number | null;
        Order_Date: Date;
        Order_Status: string;
        Client_Name: string | null;
        Client_Email: string | null;
        Client_Number: string | null;
        OrderID: number;
    }>;
}
