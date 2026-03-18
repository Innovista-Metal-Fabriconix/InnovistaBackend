import {
  Body,
  Controller,
  Post,
  UseGuards,
  Query,
  Req,
  Get,
  Delete,
} from '@nestjs/common';
import { AuthenticationService } from './Authentication.service';
import { AuthDTO } from './DTO/Authentication.DTO';
import { AdminAuthGuard } from './Authentication.AdminAuthgurd';
import { Request } from 'express';


interface AuthRequest extends Request {
  user: {
    email: string;
  };
}

@Controller('auth')
export class AuthenticationController {
  constructor(private authService: AuthenticationService) {}

  @UseGuards(AdminAuthGuard)
  @Post('register')
  async register(@Body() authDto: AuthDTO) {
    return this.authService.register(authDto);
  }

  @Post('login')
  async login(
    @Query('email') email: string,
    @Query('password') password: string,
  ) {
    return this.authService.login(email, password);
  }

  @Post('refresh')
  async refresh(@Query('refreshToken') refreshToken: string) {
    return this.authService.refreshAccessToken(refreshToken);
  }

  @Post('logout')
  async logout(@Query('adminId') adminId: string) {
    return this.authService.logout(Number(adminId));
  }

 
  @UseGuards(AdminAuthGuard)
  @Post('forgot-password')
  async forgotPassword(
    @Req() req: AuthRequest,
    @Query('newPassword') newPassword: string,
  ) {
    return this.authService.passwordReset(req.user.email, newPassword);
  }

  @Post('ResetPassword')
  async passwordReset_Loginuser(@Query('email') Adminemail: string) {
    return this.authService.passwordReset_Login(Adminemail);
  }

  @UseGuards(AdminAuthGuard)
  @Get('getAllAdmins')
  async getAllAdmins() {
    return this.authService.GetallAdmins();
  }

  @UseGuards(AdminAuthGuard)
  @Delete('RemoveAdmin')
  async removeAdmin(@Query('adminId') adminId: string) {
    return this.authService.RemoveAdmin(parseInt(adminId, 10));
  }
}