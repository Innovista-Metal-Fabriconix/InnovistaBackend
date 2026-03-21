export declare class CustomerDTO {
    CustomerId: number;
    Cus_Name: string;
    Cus_Email: string;
    Cus_PhoneNumber: string;
    Cus_CompanyName: string;
    Cus_Logo: string;
    Cus_Password: string;
    Purchase_Goods: string[];
}
export declare class UpdateCustomer {
    CustomerId: number;
    Cus_Name: string;
    Cus_Email: string;
    Cus_PhoneNumber: string;
    Cus_CompanyName: string;
    Cus_Logo: string;
    Cus_Password?: string;
    Verify_State?: boolean;
    Purchase_Goods: string[];
}
