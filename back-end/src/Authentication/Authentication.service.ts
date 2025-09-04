import { Injectable, BadRequestException } from '@nestjs/common';
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
        context: { name: admin.Admin_Name },
      });
    
      if (!this.tokenCreate) {
        throw new BadRequestException('Token creation service is not available');
      }
      
      const token = this.tokenCreate.createToken(admin);

      return { message: 'Admin registered successfully', admin, token };
    } catch (error) {
      throw new BadRequestException('Error registering admin');
    }
  }
}
