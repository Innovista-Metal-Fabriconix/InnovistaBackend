import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { AuthDTO } from './DTO/Authentication.DTO';
import * as bcrypt from 'bcrypt';
import { EmailService } from '../Emails/Email.service';
import { EmailTemplate } from '../Emails/Email.DTO';
import { TokenCreate } from './Authentication.TokenCreate';

@Injectable()
export class AuthenticationService {
  constructor(
    private prisma: PrismaService,
    private emailService: EmailService,
    private tokenCreate: TokenCreate,
  ) {}

  async register(authDto: AuthDTO) {
    try {
      const hashedPassword = await bcrypt.hash(authDto.Admin_Password, 10);

      const admin = await this.prisma.admin.create({
        data: {
          Admin_Name: authDto.Admin_Name,
          Admin_Email: authDto.Admin_Email,
          Admin_Phone: authDto.Admin_Phone,
          Admin_Profile: authDto.Admin_Profile,
          Admin_Password: hashedPassword,
        },
      });

      await this.emailService.sendEmail({
        to: admin.Admin_Email,
        template: EmailTemplate.WELCOME,
        context: {
          name: admin.Admin_Name,
          password: authDto.Admin_Password,
        },
      });

      const tokens = this.tokenCreate.createTokens(admin);

      await this.prisma.refreshToken.upsert({
        where: { adminId: admin.AdminId },
        update: {
          token: tokens.refreshToken,
          issuedAt: new Date(),
          expiryAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        },
        create: {
          adminId: admin.AdminId,
          token: tokens.refreshToken,
          issuedAt: new Date(),
          expiryAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        },
      });

      return { message: 'Admin registered successfully', admin, tokens };
    } catch (error) {
      throw new BadRequestException('Error registering admin');
    }
  }

  async login(email: string, password: string) {
    try {
      const admin = await this.prisma.admin.findUnique({
        where: { Admin_Email: email },
      });

      if (!admin) {
        throw new UnauthorizedException('Invalid credentials');
      }

      const passwordMatch = await bcrypt.compare(
        password,
        admin.Admin_Password,
      );
      if (!passwordMatch) {
        throw new UnauthorizedException('Invalid credentials');
      }

      const tokens = this.tokenCreate.createTokens(admin);

      await this.prisma.refreshToken.upsert({
        where: { adminId: admin.AdminId },
        update: {
          token: tokens.refreshToken,
          issuedAt: new Date(),
          expiryAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        },
        create: {
          adminId: admin.AdminId,
          token: tokens.refreshToken,
          issuedAt: new Date(),
          expiryAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        },
      });

      return { message: 'Login successful', admin, tokens };
    } catch (error) {
      throw new UnauthorizedException('Login failed');
    }
  }

  async refreshAccessToken(refreshToken: string) {
    try {
      const payload: any = this.tokenCreate.verifyToken(refreshToken);

      const storedToken = await this.prisma.refreshToken.findUnique({
        where: { adminId: payload.sub },
      });

      if (!storedToken || storedToken.token !== refreshToken) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      if (new Date() > storedToken.expiryAt) {
        throw new UnauthorizedException('Refresh token expired');
      }

      const admin = await this.prisma.admin.findUnique({
        where: { AdminId: payload.sub },
      });

      if (!admin) {
        throw new UnauthorizedException('Admin not found');
      }

      const tokens = this.tokenCreate.createTokens(admin);

      await this.prisma.refreshToken.update({
        where: { adminId: admin.AdminId },
        data: {
          token: tokens.refreshToken,
          issuedAt: new Date(),
          expiryAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        },
      });

      return {
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async logout(adminId: number) {
    try {
      await this.prisma.refreshToken.delete({
        where: { adminId },
      });
      return { message: 'Logout successful' };
    } catch (error) {
      throw new BadRequestException('Error during logout');
    }
  }

  async passwordReset(email: string, newPassword: string) {
    try {
      const findAdmin = await this.prisma.admin.findUnique({
        where: { Admin_Email: email },
      });
      if (!findAdmin) {
        throw new BadRequestException('Admin with this email does not exist');
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await this.prisma.admin.update({
        where: { Admin_Email: email },
        data: { Admin_Password: hashedPassword },
      });
      return { message: 'Password reset successful' };
    } catch (error) {
      throw new BadRequestException('Error during password reset');
    }
  }
}
