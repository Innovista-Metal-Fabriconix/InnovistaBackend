import { Request as ExpressRequest } from 'express';
import { CustomerDTO, UpdateCustomer } from './Customer.DTO';
import { CustomerService } from './Customer.service';
export declare class CustomerController {
    private customerService;
    constructor(customerService: CustomerService);
    registerCustomer(customerDto: CustomerDTO, req: ExpressRequest & {
        user?: {
            userId: string;
        };
    }): Promise<{
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
    getAllCustomers(page: string, limit: string): Promise<{
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        data: {
            CustomerId: number;
            Cus_Name: string;
            Cus_Email: string;
            Cus_PhoneNumber: string;
            Cus_CompanyName: string | null;
            Cus_Logo: string | null;
            Cus_Password: string;
            Purchase_Goods: string[];
            Verify_State: boolean;
        }[];
    }>;
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
    deleteCustomer(customerId: string, req: ExpressRequest & {
        user?: {
            userId: string;
        };
    }): Promise<{
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
    updateCustomer(UpdateCustomer: UpdateCustomer, req: ExpressRequest & {
        user?: {
            userId: string;
        };
    }): Promise<{
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
