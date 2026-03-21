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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectsController = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
const Projects_DTO_1 = require("./Projects.DTO");
const Projects_service_1 = require("./Projects.service");
const Authentication_AdminAuthgurd_1 = require("../Authentication/Authentication.AdminAuthgurd");
let ProjectsController = class ProjectsController {
    constructor(projectsService) {
        this.projectsService = projectsService;
    }
    async createProject(projectDto) {
        return this.projectsService.createProject(projectDto);
    }
    async getAllProjects(page, limit) {
        return this.projectsService.getAllProjects(Number(page) || 1, Number(limit) || 10);
    }
    async deleteProject(projectId) {
        return this.projectsService.deleteProject(projectId);
    }
};
exports.ProjectsController = ProjectsController;
__decorate([
    (0, common_2.UseGuards)(Authentication_AdminAuthgurd_1.AdminAuthGuard),
    (0, common_1.Post)('createProject'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Projects_DTO_1.ProjectDTO]),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "createProject", null);
__decorate([
    (0, common_1.Get)('getAllProjects'),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "getAllProjects", null);
__decorate([
    (0, common_2.UseGuards)(Authentication_AdminAuthgurd_1.AdminAuthGuard),
    (0, common_1.Delete)('deleteProject'),
    __param(0, (0, common_1.Query)('ProjectID', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProjectsController.prototype, "deleteProject", null);
exports.ProjectsController = ProjectsController = __decorate([
    (0, common_2.Controller)('projects'),
    __metadata("design:paramtypes", [Projects_service_1.ProjectsService])
], ProjectsController);
//# sourceMappingURL=Projects.controller.js.map