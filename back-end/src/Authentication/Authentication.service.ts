import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { AuthDTO } from './DTO/Authentication.DTO';
import * as bcrypt from 'bcrypt';
import { EmailService } from '../Emails/Email.service';
import { EmailTemplate } from '../Emails/Email.DTO'; 

@Injectable()
export class AuthenticationService {
  constructor(
    private prisma: PrismaService,
    private emailService: EmailService
  ) {}

  async register(authDto: AuthDTO) {
    try {
     
      const hashedPassword = await bcrypt.hash(authDto.Admin_Password, 10);
      authDto.Admin_Password = hashedPassword;

       const admin = await this.prisma.admin.create({
        data: {
          Admin_Name: authDto.Admin_Name,
          Admin_Email: authDto.Admin_Email,
          Admin_Phone: authDto.Admin_Phone,
          Admin_Profile: authDto.Admin_Profile,
          Admin_Password: authDto.Admin_Password,
        },
      });

      await this.emailService.sendEmail({
        to: authDto.Admin_Email,
        template: EmailTemplate.WELCOME,
        context: {
          name: authDto.Admin_Name,
        },
      });

      return { message: 'Admin registered successfully', admin };
    } catch (error) {
      throw new BadRequestException('Error registering admin');
    }
  }
}
