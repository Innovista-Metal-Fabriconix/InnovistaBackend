import { PrismaService } from '../../prisma/prisma.service';
import { ProjectDTO } from '../Projects/Projects.DTO';
export declare class ProjectsService {
    private prisma;
    constructor(prisma: PrismaService);
    createProject(projectDto: ProjectDTO): Promise<{
        message: string;
        project: {
            Project_Title: string;
            Project_Description: string;
            Project_Images: string[];
            Project_CreatedAt: Date;
            Location: string;
            Client_Name: string;
            Client_Email: string;
            Client_Number: string | null;
            Client_Company: string | null;
            Project_FinishedDate: Date | null;
            Budget: number;
            ProjectID: number;
        };
    }>;
    getAllProjects(): Promise<{
        message: string;
        projects: {
            Project_Title: string;
            Project_Description: string;
            Project_Images: string[];
            Project_CreatedAt: Date;
            Location: string;
            Client_Name: string;
            Client_Email: string;
            Client_Number: string | null;
            Client_Company: string | null;
            Project_FinishedDate: Date | null;
            Budget: number;
            ProjectID: number;
        }[];
    }>;
    deleteProject(ProjectID: number): Promise<{
        message: string;
        project: {
            Project_Title: string;
            Project_Description: string;
            Project_Images: string[];
            Project_CreatedAt: Date;
            Location: string;
            Client_Name: string;
            Client_Email: string;
            Client_Number: string | null;
            Client_Company: string | null;
            Project_FinishedDate: Date | null;
            Budget: number;
            ProjectID: number;
        };
    }>;
}
