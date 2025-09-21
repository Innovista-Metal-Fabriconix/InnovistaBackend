import { PrismaService } from '../../prisma/prisma.service';
import { CustomerDTO } from './Customer.DTO';
import { EmailService } from '../Emails/Email.service';
export declare class CustomerService {
    private prisma;
    private emailService;
    constructor(prisma: PrismaService, emailService: EmailService);
    registedCustomer(customerDto: CustomerDTO, AdminId: number): Promise<{
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
    changePassword(customerId: number, newPassword: string): Promise<{
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
    verifyCustomerEmail(customerId: number): Promise<{
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
    removeCustomer(customerId: number, AdminId: number): Promise<{
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
    updateCustomer(customerDto: CustomerDTO, AdminId: number): Promise<{
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
