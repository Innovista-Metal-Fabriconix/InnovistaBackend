import { DesignsService } from "./Designs.service";
import { DesignDTO } from "./Designs.DTO";
export declare class DesignsController {
    private designsService;
    constructor(designsService: DesignsService);
    createDesigns(designDto: DesignDTO, req: any): Promise<{
        message: string;
        design: {
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
    }>;
    getAllDesigns(): Promise<{
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
    }[]>;
    deleteDesigns(designId: string, req: any): Promise<{
        message: string;
        design: {
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
    }>;
    updateDesigns(designDto: DesignDTO, req: any): Promise<{
        message: string;
        design: {
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
    }>;
}
