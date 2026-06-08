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

interface TokenPayload {
  sub: number;
  iat?: number;
  exp?: number;
}

@Injectable()
export class AuthenticationService {
  constructor(
    private prisma: PrismaService,
    private emailService: EmailService,
    private tokenCreate: TokenCreate,
  ) {}

  async register(authDto: AuthDTO) {
    try {
      const namePart = authDto.Admin_Name.slice(0, 3);
      const emailPart = authDto.Admin_Email.split('@')[0].slice(-3);
      const rawPassword = `${namePart}${emailPart}${Date.now().toString().slice(-4)}`;

      const hashedPassword = await bcrypt.hash(rawPassword, 10);

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
          password: rawPassword,
        },
      });

      const tokens = this.tokenCreate.createTokens({
        AdminId: admin.AdminId,
        Admin_Email: admin.Admin_Email,
        Admin_Name: admin.Admin_Name,
        Admin_Phone: admin.Admin_Phone ?? undefined,
        Admin_Profile: admin.Admin_Profile ?? undefined, 
      });

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
    } catch (error: any) {
      if (error.code === 'P2002') {
        throw new BadRequestException('An account with this email already exists.');
      }
      const message = error instanceof Error ? error.message : String(error);
      throw new BadRequestException('Error during registration: ' + message);
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

      const tokens = this.tokenCreate.createTokens({
        AdminId: admin.AdminId,
        Admin_Email: admin.Admin_Email,
        Admin_Name: admin.Admin_Name,
        Admin_Phone: admin.Admin_Phone ?? undefined,
        Admin_Profile: admin.Admin_Profile ?? undefined,
      });

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
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      throw new BadRequestException('Error during login: ' + message);
    }
  }

  async refreshAccessToken(refreshToken: string) {
    try {
      const payload = this.tokenCreate.verifyToken(
        refreshToken,
      ) as unknown as TokenPayload;

      if (typeof payload.sub === 'string') {
        payload.sub = Number(payload.sub);
      }

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
        where: {
          AdminId: payload.sub,
        },
      });

      if (!admin) {
        throw new UnauthorizedException('Admin not found');
      }

      const tokens = this.tokenCreate.createTokens({
        AdminId: admin.AdminId,
        Admin_Email: admin.Admin_Email,
        Admin_Name: admin.Admin_Name,
        Admin_Phone: admin.Admin_Phone ?? undefined,
        Admin_Profile: admin.Admin_Profile ?? undefined,
      });

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
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      throw new BadRequestException('Error refreshing access token: ' + message);
    }
  }

  async logout(adminId: number) {
    try {
      await this.prisma.refreshToken.delete({
        where: { adminId },
      });
      return { message: 'Logout successful' };
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      throw new BadRequestException('Error during logout: ' + message);
    }
  }

  async passwordReset_Login(email: string) {
    try {
      const findAdminAccount = await this.prisma.admin.findUnique({
        where: { Admin_Email: email },
      });

      if (!findAdminAccount) {
        throw new BadRequestException('Admin with this email does not exist');
      }

      const nameOf_Admin = findAdminAccount.Admin_Name.slice(0, 3);
      const emailOf_Admin =
        findAdminAccount.Admin_Email.split('@')[0].slice(-3);
      const newUpdate_Password = `${nameOf_Admin}${emailOf_Admin}${Date.now().toString().slice(-4)}`;

      const hashNewpassword = await bcrypt.hash(newUpdate_Password, 10);

      await this.prisma.admin.update({
        where: { Admin_Email: email },
        data: { Admin_Password: hashNewpassword },
      });

      await this.emailService.sendEmail({
        to: findAdminAccount.Admin_Email,
        template: EmailTemplate.REQUEST_NEWPASSWORD,
        context: {
          newPassword: newUpdate_Password,
          name: nameOf_Admin,
        },
      });
      return { message: 'Password Reset Successfully Check Your email' };
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      throw new BadRequestException('Error during password reset request: ' + message);
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
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      throw new BadRequestException('Error during password reset: ' + message);
    }
  }

  async GetallAdmins() {
    try {
      const admins = await this.prisma.admin.findMany();
      return admins;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      throw new BadRequestException('Error retrieving admins: ' + message);
    }
  }

  async RemoveAdmin(adminId: number) {
    try {
      await this.prisma.admin.delete({
        where: { AdminId: adminId },
      });

      if (!adminId) {
        throw new BadRequestException('Admin not found');
      }
      return { message: 'Admin removed successfully' };
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      throw new BadRequestException('Error retrieving admins: ' + message);
    }
  }
}
