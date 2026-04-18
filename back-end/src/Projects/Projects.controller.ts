import {
  Body,
  Query,
  Post,
  Get,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { Controller, UseGuards } from '@nestjs/common';
import { ProjectDTO } from './Projects.DTO';
import { ProjectsService } from './Projects.service';
import { AdminAuthGuard } from '../Authentication/Authentication.AdminAuthgurd';

@Controller('projects')
export class ProjectsController {
  constructor(private projectsService: ProjectsService) {}

  @UseGuards(AdminAuthGuard)
  @Post('createProject')
  async createProject(@Body() projectDto: ProjectDTO) {
    return this.projectsService.createProject(projectDto);
  }


  @Get('getAllProjects')
  async getAllProjects(
    @Query('page') page: string,  
    @Query('limit') limit: string,
  ) {
    return this.projectsService.getAllProjects(
      Number(page) || 1,
      Number(limit) || 10,
    );
  }
  

  @UseGuards(AdminAuthGuard)
  @Delete('deleteProject')
  async deleteProject(@Query('ProjectID', ParseIntPipe) projectId: number) {
    return this.projectsService.deleteProject(projectId);
  }
}
