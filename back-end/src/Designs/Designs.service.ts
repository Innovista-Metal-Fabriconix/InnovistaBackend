import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { DesignDTO } from './Designs.DTO';

@Injectable()
export class DesignsService {
  constructor(private prisma: PrismaService) {}

  async createDesign(designDto: DesignDTO, AdminId: number) {
    try {
      const admin = await this.prisma.admin.findUnique({
        where: { AdminId: AdminId },
      });

      if (!admin) {
        throw new UnauthorizedException('Admin not found');
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
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      throw new BadRequestException('Error retrieving projects: ' + message);
    }
  }

  async getAllDesigns() {
    try {
      const designs = await this.prisma.design.findMany();
      return designs;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      throw new BadRequestException('Error retrieving projects: ' + message);
    }
  }

  async deleteDesign(designId: number, AdminId: number) {
    try {
      const admin = await this.prisma.admin.findUnique({
        where: { AdminId: AdminId },
      });

      if (!admin) {
        throw new UnauthorizedException('Admin not found');
      }
      const design = await this.prisma.design.delete({
        where: { DesignID: designId },
      });
      return { message: 'Design deleted successfully', design };
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      throw new BadRequestException('Error retrieving projects: ' + message);
    }
  }

  async updateDesign(designDto: DesignDTO, AdminId: number) {
    try {
      const admin = await this.prisma.admin.findUnique({
        where: { AdminId: AdminId },
      });

      if (!admin) {
        throw new UnauthorizedException('Admin not found');
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
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      throw new BadRequestException('Error retrieving projects: ' + message);
    }
  }
}
