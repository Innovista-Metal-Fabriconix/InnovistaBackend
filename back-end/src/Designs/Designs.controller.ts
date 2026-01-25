import {
  Body,
  Controller,
  Post,
  UseGuards,
  Query,
  Req,
  Get,
  Delete,
  Put,
} from '@nestjs/common';
import { DesignsService } from './Designs.service';
import { DesignDTO } from './Designs.DTO';
import { AdminAuthGuard } from '../Authentication/Authentication.AdminAuthgurd';

@Controller('designs')
export class DesignsController {
  constructor(private designsService: DesignsService) {}

  @UseGuards(AdminAuthGuard)
  @Post('create')
  async createDesigns(
    @Body() designDto: DesignDTO,
    @Req() req: { user: { userId: number } },
  ) {
    const AdminId = req.user.userId;
    return this.designsService.createDesign(designDto, AdminId);
  }

  // @Get('all')
  // async getAllDesigns() {
  //   return this.designsService.getAllDesigns();
  // }

  @Get('all')
  async getAllDesigns(
    @Query('page') page: string,
    @Query('limit') limit: string,
  ) {
    return this.designsService.getAllDesigns(
      Number(page) || 1,
      Number(limit) || 10,
    );
  }

  @Get('byCategory')
  async getDesignsByCategory(@Query('category') category: string) {
    return this.designsService.getUnderCategoryDesigns(category);
  }

  @Get('DesignDetails')
  async getDesignDetails(@Query('ids') ids: string) {
    const designIDs = ids.split(',').map(Number);
    return this.designsService.GetItemDesignDetails(designIDs);
  }

  @UseGuards(AdminAuthGuard)
  @Delete('deleteDesign')
  async deleteDesigns(
    @Query('designId') designId: string,
    @Req() req: { user: { userId: number } },
  ) {
    const AdminId = req.user.userId;
    return this.designsService.deleteDesign(parseInt(designId, 10), AdminId);
  }

  @UseGuards(AdminAuthGuard)
  @Put('updateDesign')
  async updateDesigns(
    @Body() designDto: DesignDTO,
    @Req() req: { user: { userId: number } },
  ) {
    const AdminId = req.user.userId;
    return this.designsService.updateDesign(designDto, AdminId);
  }
}
