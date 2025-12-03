import { ProjectDTO } from './Projects.DTO';
import { ProjectsService } from './Projects.service';
export declare class ProjectsController {
    private projectsService;
    constructor(projectsService: ProjectsService);
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
    getAllProjects(): Promise<{
        message: string;
        projects: {
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
    deleteProject(projectId: number): Promise<{
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
