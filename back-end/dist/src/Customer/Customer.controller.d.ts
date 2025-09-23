import { CustomerDTO, UpdateCustomer } from './Customer.DTO';
import { CustomerService } from './Customer.service';
export declare class CustomerController {
    private customerService;
    constructor(customerService: CustomerService);
    registerCustomer(customerDto: CustomerDTO, req: any): Promise<{
        message: string;
        customer: {
            Cus_Name: string;
            Cus_Email: string;
            Cus_PhoneNumber: string;
            Cus_CompanyName: string | null;
            Cus_Logo: string | null;
            Verify_State: boolean;
            Cus_Password: string;
            Purchase_Goods: string[];
            CustomerId: number;
        };
    }>;
    getAllCustomers(): Promise<{
        Cus_Name: string;
        Cus_Email: string;
        Cus_PhoneNumber: string;
        Cus_CompanyName: string | null;
        Cus_Logo: string | null;
        Verify_State: boolean;
        Cus_Password: string;
        Purchase_Goods: string[];
        CustomerId: number;
    }[]>;
    verifyCustomer(customerId: string): Promise<{
        message: string;
        customer: {
            Cus_Name: string;
            Cus_Email: string;
            Cus_PhoneNumber: string;
            Cus_CompanyName: string | null;
            Cus_Logo: string | null;
            Verify_State: boolean;
            Cus_Password: string;
            Purchase_Goods: string[];
            CustomerId: number;
        };
    }>;
    deleteCustomer(customerId: string, req: any): Promise<{
        message: string;
        customer: {
            Cus_Name: string;
            Cus_Email: string;
            Cus_PhoneNumber: string;
            Cus_CompanyName: string | null;
            Cus_Logo: string | null;
            Verify_State: boolean;
            Cus_Password: string;
            Purchase_Goods: string[];
            CustomerId: number;
        };
    }>;
    updateCustomer(UpdateCustomer: UpdateCustomer, req: any): Promise<{
        message: string;
        customer: {
            Cus_Name: string;
            Cus_Email: string;
            Cus_PhoneNumber: string;
            Cus_CompanyName: string | null;
            Cus_Logo: string | null;
            Verify_State: boolean;
            Cus_Password: string;
            Purchase_Goods: string[];
            CustomerId: number;
        };
    }>;
}
