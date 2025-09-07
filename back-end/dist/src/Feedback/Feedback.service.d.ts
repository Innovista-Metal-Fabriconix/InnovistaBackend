import { PrismaService } from '../../prisma/prisma.service';
import { FeedbackDTO } from './Feedback.DTO';
export declare class FeedbackService {
    private prisma;
    constructor(prisma: PrismaService);
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
    getAllFeedbacks(): Promise<({
        Design: {
            AdminId: number;
            Design_Name: string;
            Design_Image: string[];
            Design_Description: string;
            Categories: string[];
            Design_Colors: string[];
            Design_BlogPosts: string[];
            Design_Sizes: string[];
            Design_CreatedAt: Date;
            DesignID: number;
        };
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
        };
    } & {
        DesignID: number;
        CustomerId: number;
        Feed_back_comment: string;
        Feed_Back_Images: string[];
        Rating: number;
        Feed_backId: number;
    })[]>;
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
            Design_Name: string;
            Design_Image: string[];
            Design_Description: string;
            Categories: string[];
            Design_Colors: string[];
            Design_BlogPosts: string[];
            Design_Sizes: string[];
            Design_CreatedAt: Date;
            DesignID: number;
        };
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
