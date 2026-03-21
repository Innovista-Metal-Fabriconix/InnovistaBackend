import { PrismaService } from '../../prisma/prisma.service';
import { DesignDTO } from './Designs.DTO';
export declare class DesignsService {
    private prisma;
    constructor(prisma: PrismaService);
    createDesign(designDto: DesignDTO, AdminId: number): Promise<{
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
    getAllDesigns(page?: number, limit?: number): Promise<{
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        data: {
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
        }[];
    }>;
    getUnderCategoryDesigns(category: string): Promise<{
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
    GetItemDesignDetails(designIDs: number[]): Promise<{
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
    deleteDesign(designId: number, AdminId: number): Promise<{
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
    updateDesign(designDto: DesignDTO, AdminId: number): Promise<{
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
