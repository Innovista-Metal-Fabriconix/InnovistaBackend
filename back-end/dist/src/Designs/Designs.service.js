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
exports.DesignsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let DesignsService = class DesignsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createDesign(designDto, AdminId) {
        try {
            const admin = await this.prisma.admin.findUnique({
                where: { AdminId: AdminId },
            });
            if (!admin) {
                throw new common_1.UnauthorizedException('Admin not found');
            }
            const design = await this.prisma.design.create({
                data: {
                    Design_Name: designDto.Design_Name,
                    Design_Image: designDto.Design_Image,
                    Design_Description: designDto.Design_Description,
                    Categories: designDto.Categories,
                    Design_Colors: designDto.Design_Colors,
                    Design_BlogPosts: designDto.Design_BlogPosts,
                    Design_Sizes: designDto.Design_Sizes,
                    Design_CreatedAt: new Date(),
                    AdminId: AdminId,
                },
            });
            return { message: 'Design created successfully', design };
        }
        catch (error) {
            const message = error instanceof Error ? error.message : String(error);
            throw new common_1.BadRequestException('Error retrieving projects: ' + message);
        }
    }
    async getAllDesigns() {
        try {
            const designs = await this.prisma.design.findMany();
            return designs;
        }
        catch (error) {
            const message = error instanceof Error ? error.message : String(error);
            throw new common_1.BadRequestException('Error retrieving projects: ' + message);
        }
    }
    async deleteDesign(designId, AdminId) {
        try {
            const admin = await this.prisma.admin.findUnique({
                where: { AdminId: AdminId },
            });
            if (!admin) {
                throw new common_1.UnauthorizedException('Admin not found');
            }
            const design = await this.prisma.design.delete({
                where: { DesignID: designId },
            });
            return { message: 'Design deleted successfully', design };
        }
        catch (error) {
            const message = error instanceof Error ? error.message : String(error);
            throw new common_1.BadRequestException('Error retrieving projects: ' + message);
        }
    }
    async updateDesign(designDto, AdminId) {
        try {
            const admin = await this.prisma.admin.findUnique({
                where: { AdminId: AdminId },
            });
            if (!admin) {
                throw new common_1.UnauthorizedException('Admin not found');
            }
            const design = await this.prisma.design.update({
                where: { DesignID: designDto.DesignID },
                data: {
                    Design_Name: designDto.Design_Name,
                    Design_Image: designDto.Design_Image,
                    Design_Description: designDto.Design_Description,
                    Categories: designDto.Categories,
                    Design_Colors: designDto.Design_Colors,
                    Design_BlogPosts: designDto.Design_BlogPosts,
                    Design_Sizes: designDto.Design_Sizes,
                },
            });
            return { message: 'Design updated successfully', design };
        }
        catch (error) {
            const message = error instanceof Error ? error.message : String(error);
            throw new common_1.BadRequestException('Error retrieving projects: ' + message);
        }
    }
};
exports.DesignsService = DesignsService;
exports.DesignsService = DesignsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DesignsService);
//# sourceMappingURL=Designs.service.js.map