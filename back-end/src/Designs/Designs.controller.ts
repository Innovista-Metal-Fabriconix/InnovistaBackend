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
  async createDesigns(@Body() designDto: DesignDTO, @Req() req) {
    const AdminId = req.user.userId;
    return this.designsService.createDesign(designDto, AdminId);
  }

  @Get('all')
  async getAllDesigns() {
    return this.designsService.getAllDesigns();
  }

  @Get('byCategory')
  async getDesignsByCategory(@Query('category') category: string) {
    return this.designsService.getUnderCategoryDesigns(category);
  }

  //   need to add unique Design IDS

  @UseGuards(AdminAuthGuard)
  @Delete('deleteDesign')
  async deleteDesigns(@Query('designId') designId: string, @Req() req) {
    const AdminId = req.user.userId;
    return this.designsService.deleteDesign(parseInt(designId, 10), AdminId);
  }

  @UseGuards(AdminAuthGuard)
  @Put('updateDesign')
  async updateDesigns(@Body() designDto: DesignDTO, @Req() req) {
    const AdminId = req.user.userId;
    return this.designsService.updateDesign(designDto, AdminId);
  }
}
