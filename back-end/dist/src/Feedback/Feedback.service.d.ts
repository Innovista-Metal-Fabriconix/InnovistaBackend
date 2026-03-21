import { PrismaService } from '../../prisma/prisma.service';
import { FeedbackDTO } from './Feedback.DTO';
export declare class FeedbackService {
    private prisma;
    constructor(prisma: PrismaService);
    accesschecktoCustomer(customerEmail: string): Promise<{
        message: string;
        customerId: number;
    }>;
    createFeedback(feedbackDto: FeedbackDTO): Promise<{
        message: string;
        feedback: {
            DesignID: number;
            CustomerId: number;
            Feed_back_comment: string;
            Feed_Back_Images: string[];
            Rating: number;
            Feed_backId: number;
        };
    }>;
    getAllFeedbacks(page: number, limit: number): Promise<{
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        data: ({
            Design: {
                AdminId: number;
                DesignID: number;
                Design_Name: string;
                Design_Image: string[];
                Design_Description: string;
                Categories: string[];
                Design_Colors: string[];
                Design_BlogPosts: string[];
                Design_Sizes: string[];
                Design_CreatedAt: Date;
            };
            Customer: {
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
        } & {
            DesignID: number;
            CustomerId: number;
            Feed_back_comment: string;
            Feed_Back_Images: string[];
            Rating: number;
            Feed_backId: number;
        })[];
    }>;
    deleteFeedback(feedbackId: number, AdminId: number): Promise<{
        message: string;
        feedback: {
            DesignID: number;
            CustomerId: number;
            Feed_back_comment: string;
            Feed_Back_Images: string[];
            Rating: number;
            Feed_backId: number;
        };
    }>;
    getfeedbackByDesignId(designId: number): Promise<({
        Design: {
            AdminId: number;
            DesignID: number;
            Design_Name: string;
            Design_Image: string[];
            Design_Description: string;
            Categories: string[];
            Design_Colors: string[];
            Design_BlogPosts: string[];
            Design_Sizes: string[];
            Design_CreatedAt: Date;
        };
        Customer: {
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
    } & {
        DesignID: number;
        CustomerId: number;
        Feed_back_comment: string;
        Feed_Back_Images: string[];
        Rating: number;
        Feed_backId: number;
    })[]>;
}
