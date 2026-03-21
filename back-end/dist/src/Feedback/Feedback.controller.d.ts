import { FeedbackDTO } from './Feedback.DTO';
import { FeedbackService } from './Feedback.service';
export declare class FeedbackController {
    private feedbackService;
    constructor(feedbackService: FeedbackService);
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
    getAllFeedbacks(page: string, limit: string): Promise<{
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
    deleteFeedback(feedbackId: string, req: {
        user?: {
            userId?: string;
        };
    }): Promise<{
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
    getFeedbackByDesignId(designId: string): Promise<({
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
