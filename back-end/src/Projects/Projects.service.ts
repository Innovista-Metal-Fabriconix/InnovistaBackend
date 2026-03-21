import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { ProjectDTO } from '../Projects/Projects.DTO';

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

  async createProject(projectDto: ProjectDTO) {
    try {
      const project = await this.prisma.project.create({
        data: {
          Project_Title: projectDto.Project_Title,
          Project_Description: projectDto.Project_Description,
          Project_CreatedAt: new Date(),
          Project_Images: projectDto.Project_Images,
          Location: projectDto.Location,
          Client_Email: projectDto.Client_Email,
          Client_Name: projectDto.Client_Name,
          Client_Number: projectDto.Client_Number,
          Client_Company: projectDto.Client_Company,
          Budget: projectDto.Budget,
        },
      });
      return { message: 'Project created successfully', project };
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      throw new BadRequestException('Error creating project: ' + message);
    }
  }

  async getAllProjects(page: number = 1, limit: number = 10) {
    try {
      const skip = (page - 1) * limit;
      const [projects, total] = await this.prisma.$transaction([
        this.prisma.project.findMany({
          skip,
          take: limit,
          orderBy: {
            ProjectID: 'desc',
          },
        }),
        this.prisma.project.count(),
      ]);
      return {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        data: projects,
      };
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      throw new BadRequestException('Error retrieving projects: ' + message);
    }
  }

  async deleteProject(ProjectID: number) {
    try {
      const project = await this.prisma.project.delete({
        where: { ProjectID: ProjectID },
      });
      return { message: 'Project deleted successfully', project };
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      throw new BadRequestException('Error deleting project: ' + message);
    }
  }
}
