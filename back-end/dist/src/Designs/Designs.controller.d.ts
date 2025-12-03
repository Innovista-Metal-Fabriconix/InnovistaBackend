import { DesignsService } from './Designs.service';
import { DesignDTO } from './Designs.DTO';
export declare class DesignsController {
    private designsService;
    constructor(designsService: DesignsService);
    createDesigns(designDto: DesignDTO, req: any): Promise<{
        message: string;
        design: {
            Design_Name: string;
            Design_Image: string[];
            Design_Description: string;
            Categories: string[];
            Design_Colors: string[];
            Design_BlogPosts: string[];
            Design_Sizes: string[];
            Design_CreatedAt: Date;
            DesignID: number;
            AdminId: number;
        };
    }>;
    getAllDesigns(): Promise<{
        Design_Name: string;
        Design_Image: string[];
        Design_Description: string;
        Categories: string[];
        Design_Colors: string[];
        Design_BlogPosts: string[];
        Design_Sizes: string[];
        Design_CreatedAt: Date;
        DesignID: number;
        AdminId: number;
    }[]>;
    getDesignsByCategory(category: string): Promise<{
        Design_Name: string;
        Design_Image: string[];
        Design_Description: string;
        Categories: string[];
        Design_Colors: string[];
        Design_BlogPosts: string[];
        Design_Sizes: string[];
        Design_CreatedAt: Date;
        DesignID: number;
        AdminId: number;
    }[]>;
    deleteDesigns(designId: string, req: any): Promise<{
        message: string;
        design: {
            Design_Name: string;
            Design_Image: string[];
            Design_Description: string;
            Categories: string[];
            Design_Colors: string[];
            Design_BlogPosts: string[];
            Design_Sizes: string[];
            Design_CreatedAt: Date;
            DesignID: number;
            AdminId: number;
        };
    }>;
    updateDesigns(designDto: DesignDTO, req: any): Promise<{
        message: string;
        design: {
            Design_Name: string;
            Design_Image: string[];
            Design_Description: string;
            Categories: string[];
            Design_Colors: string[];
            Design_BlogPosts: string[];
            Design_Sizes: string[];
            Design_CreatedAt: Date;
            DesignID: number;
            AdminId: number;
        };
    }>;
}
