"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let ProjectsService = class ProjectsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createProject(projectDto) {
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
        }
        catch (error) {
            const message = error instanceof Error ? error.message : String(error);
            throw new common_1.BadRequestException('Error creating project: ' + message);
        }
    }
    async getAllProjects() {
        try {
            const projects = await this.prisma.project.findMany();
            return { message: 'Projects retrieved successfully', projects };
        }
        catch (error) {
            const message = error instanceof Error ? error.message : String(error);
            throw new common_1.BadRequestException('Error retrieving projects: ' + message);
        }
    }
    async deleteProject(ProjectID) {
        try {
            const project = await this.prisma.project.delete({
                where: { ProjectID: ProjectID },
            });
            return { message: 'Project deleted successfully', project };
        }
        catch (error) {
            const message = error instanceof Error ? error.message : String(error);
            throw new common_1.BadRequestException('Error deleting project: ' + message);
        }
    }
};
exports.ProjectsService = ProjectsService;
exports.ProjectsService = ProjectsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProjectsService);
//# sourceMappingURL=Projects.service.js.map