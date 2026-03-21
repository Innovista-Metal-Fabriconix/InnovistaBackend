import { PrismaService } from '../../prisma/prisma.service';
import { ProjectDTO } from '../Projects/Projects.DTO';
export declare class ProjectsService {
    private prisma;
    constructor(prisma: PrismaService);
    createProject(projectDto: ProjectDTO): Promise<{
        message: string;
        project: {
            Client_Name: string;
            Client_Email: string;
            Client_Number: string | null;
            ProjectID: number;
            Project_Title: string;
            Project_Description: string;
            Project_Images: string[];
            Project_CreatedAt: Date;
            Location: string;
            Client_Company: string | null;
            Project_FinishedDate: Date | null;
            Budget: number;
        };
    }>;
    getAllProjects(page?: number, limit?: number): Promise<{
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        data: {
            Client_Name: string;
            Client_Email: string;
            Client_Number: string | null;
            ProjectID: number;
            Project_Title: string;
            Project_Description: string;
            Project_Images: string[];
            Project_CreatedAt: Date;
            Location: string;
            Client_Company: string | null;
            Project_FinishedDate: Date | null;
            Budget: number;
        }[];
    }>;
    deleteProject(ProjectID: number): Promise<{
        message: string;
        project: {
            Client_Name: string;
            Client_Email: string;
            Client_Number: string | null;
            ProjectID: number;
            Project_Title: string;
            Project_Description: string;
            Project_Images: string[];
            Project_CreatedAt: Date;
            Location: string;
            Client_Company: string | null;
            Project_FinishedDate: Date | null;
            Budget: number;
        };
    }>;
}
