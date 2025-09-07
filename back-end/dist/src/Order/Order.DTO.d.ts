import { CustomerDTO } from '../Customer/Customer.DTO';
import { DesignDTO } from '../Designs/Designs.DTO';
export declare enum OrderStatus {
    PENDING = "PENDING",
    SEND = "SEND",
    VIEWORDER = "VIEWORDER",
    COMPLETED = "COMPLETED"
}
export declare class OrderDTO {
    OrderID?: number;
    CustomerId?: number;
    Order_Date?: Date;
    Order_Status: OrderStatus;
    Client_Name?: string;
    Client_Email?: string;
    Client_Number?: string;
    Customer?: CustomerDTO;
    Designs?: DesignDTO[];
}
