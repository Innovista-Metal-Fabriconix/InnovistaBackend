import { PrismaService } from '../../prisma/prisma.service';
import { CustomerDTO, UpdateCustomer } from './Customer.DTO';
import { EmailService } from '../Emails/Email.service';
export declare class CustomerService {
    private prisma;
    private emailService;
    constructor(prisma: PrismaService, emailService: EmailService);
    registedCustomer(customerDto: CustomerDTO, AdminId: number): Promise<{
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
    changePassword(customerId: number, newPassword: string): Promise<{
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
    verifyCustomerEmail(customerId: number): Promise<{
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
    getAllCustomers(page?: number, limit?: number): Promise<{
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
    removeCustomer(customerId: number, AdminId: number): Promise<{
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
    updateCustomer(UpdateCustomer: UpdateCustomer, AdminId: number): Promise<{
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
