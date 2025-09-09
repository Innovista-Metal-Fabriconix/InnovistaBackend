import { CustomerDTO } from './Customer.DTO';
import { CustomerService } from './Customer.service';
export declare class CustomerController {
    private customerService;
    constructor(customerService: CustomerService);
    registerCustomer(customerDto: CustomerDTO, req: any): Promise<{
        message: string;
        customer: {
            CustomerId: number;
            Cus_Name: string;
            Cus_Email: string;
            Cus_PhoneNumber: string;
            Cus_CompanyName: string | null;
            Cus_Logo: string | null;
            Cus_Password: string;
            Purchase_Goods: string[];
            Verify_State: boolean;
        };
    }>;
    getAllCustomers(): Promise<{
        CustomerId: number;
        Cus_Name: string;
        Cus_Email: string;
        Cus_PhoneNumber: string;
        Cus_CompanyName: string | null;
        Cus_Logo: string | null;
        Cus_Password: string;
        Purchase_Goods: string[];
        Verify_State: boolean;
    }[]>;
    verifyCustomer(customerId: string): Promise<{
        message: string;
        customer: {
            CustomerId: number;
            Cus_Name: string;
            Cus_Email: string;
            Cus_PhoneNumber: string;
            Cus_CompanyName: string | null;
            Cus_Logo: string | null;
            Cus_Password: string;
            Purchase_Goods: string[];
            Verify_State: boolean;
        };
    }>;
    deleteCustomer(customerId: string, req: any): Promise<{
        message: string;
        customer: {
            CustomerId: number;
            Cus_Name: string;
            Cus_Email: string;
            Cus_PhoneNumber: string;
            Cus_CompanyName: string | null;
            Cus_Logo: string | null;
            Cus_Password: string;
            Purchase_Goods: string[];
            Verify_State: boolean;
        };
    }>;
}
