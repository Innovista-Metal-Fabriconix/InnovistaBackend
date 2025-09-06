import { PrismaService } from '../../prisma/prisma.service';
import { DesignDTO } from './Designs.DTO';
export declare class DesignsService {
    private prisma;
    constructor(prisma: PrismaService);
    createDesign(designDto: DesignDTO, AdminId: number): Promise<{
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
    deleteDesign(designId: number, AdminId: number): Promise<{
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
