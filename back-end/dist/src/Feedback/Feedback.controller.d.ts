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
            CustomerId: number;
            Feed_back_comment: string;
            Feed_Back_Images: string[];
            Rating: number;
            Feed_backId: number;
            DesignID: number;
        };
    }>;
    getAllFeedbacks(): Promise<({
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
        Design: {
            DesignID: number;
            Design_Name: string;
            Design_Image: string[];
            Design_Description: string;
            Categories: string[];
            Design_Colors: string[];
            Design_BlogPosts: string[];
            Design_Sizes: string[];
            Design_CreatedAt: Date;
            AdminId: number;
        };
    } & {
        CustomerId: number;
        Feed_back_comment: string;
        Feed_Back_Images: string[];
        Rating: number;
        Feed_backId: number;
        DesignID: number;
    })[]>;
    deleteFeedback(feedbackId: string, req: any): Promise<{
        message: string;
        feedback: {
            CustomerId: number;
            Feed_back_comment: string;
            Feed_Back_Images: string[];
            Rating: number;
            Feed_backId: number;
            DesignID: number;
        };
    }>;
    getFeedbackByDesignId(designId: string): Promise<({
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
        Design: {
            DesignID: number;
            Design_Name: string;
            Design_Image: string[];
            Design_Description: string;
            Categories: string[];
            Design_Colors: string[];
            Design_BlogPosts: string[];
            Design_Sizes: string[];
            Design_CreatedAt: Date;
            AdminId: number;
        };
    } & {
        CustomerId: number;
        Feed_back_comment: string;
        Feed_Back_Images: string[];
        Rating: number;
        Feed_backId: number;
        DesignID: number;
    })[]>;
}
