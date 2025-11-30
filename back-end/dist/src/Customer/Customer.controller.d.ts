import { CustomerDTO, UpdateCustomer } from './Customer.DTO';
import { CustomerService } from './Customer.service';
export declare class CustomerController {
    private customerService;
    constructor(customerService: CustomerService);
    registerCustomer(customerDto: CustomerDTO, req: any): Promise<{
        message: string;
        customer: {
            CustomerId: number;
            Cus_Email: string;
            Cus_Name: string;
            Cus_PhoneNumber: string;
            Cus_CompanyName: string | null;
            Cus_Logo: string | null;
            Verify_State: boolean;
            Cus_Password: string;
            Purchase_Goods: string[];
        };
    }>;
    getAllCustomers(): Promise<{
        CustomerId: number;
        Cus_Email: string;
        Cus_Name: string;
        Cus_PhoneNumber: string;
        Cus_CompanyName: string | null;
        Cus_Logo: string | null;
        Verify_State: boolean;
        Cus_Password: string;
        Purchase_Goods: string[];
    }[]>;
    verifyCustomer(customerId: string): Promise<{
        message: string;
        customer: {
            CustomerId: number;
            Cus_Email: string;
            Cus_Name: string;
            Cus_PhoneNumber: string;
            Cus_CompanyName: string | null;
            Cus_Logo: string | null;
            Verify_State: boolean;
            Cus_Password: string;
            Purchase_Goods: string[];
        };
    }>;
    deleteCustomer(customerId: string, req: any): Promise<{
        message: string;
        customer: {
            CustomerId: number;
            Cus_Email: string;
            Cus_Name: string;
            Cus_PhoneNumber: string;
            Cus_CompanyName: string | null;
            Cus_Logo: string | null;
            Verify_State: boolean;
            Cus_Password: string;
            Purchase_Goods: string[];
        };
    }>;
    updateCustomer(UpdateCustomer: UpdateCustomer, req: any): Promise<{
        message: string;
        customer: {
            CustomerId: number;
            Cus_Email: string;
            Cus_Name: string;
            Cus_PhoneNumber: string;
            Cus_CompanyName: string | null;
            Cus_Logo: string | null;
            Verify_State: boolean;
            Cus_Password: string;
            Purchase_Goods: string[];
        };
    }>;
}
