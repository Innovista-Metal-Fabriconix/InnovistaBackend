import { DesignsService } from "./Designs.service";
import { DesignDTO } from "./Designs.DTO";
export declare class DesignsController {
    private designsService;
    constructor(designsService: DesignsService);
    createDesigns(designDto: DesignDTO, req: any): Promise<{
        message: string;
        design: {
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
    }>;
    getAllDesigns(): Promise<{
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
    }[]>;
    deleteDesigns(designId: string, req: any): Promise<{
        message: string;
        design: {
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
    }>;
    updateDesigns(designDto: DesignDTO, req: any): Promise<{
        message: string;
        design: {
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
    }>;
}
