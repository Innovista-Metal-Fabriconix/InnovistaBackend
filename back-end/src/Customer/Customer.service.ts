import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';
import { CustomerDTO } from './Customer.DTO';
import * as bcrypt from 'bcrypt';
import { EmailService } from '../Emails/Email.service';
import { EmailTemplate } from '../Emails/Email.DTO';

@Injectable()
export class CustomerService {
  constructor(
    private prisma: PrismaService,
    private emailService: EmailService,
  ) {}

  async registedCustomer(customerDto: CustomerDTO, AdminId: number) {
    const Admin = await this.prisma.admin.findUnique({
      where: { AdminId: AdminId },
    });

    if (!Admin) {
      throw new UnauthorizedException('Admin not found');
    }

    try {
      const existingCustomer = await this.prisma.customer.findUnique({
        where: { Cus_Email: customerDto.Cus_Email },
      });
      if (existingCustomer) {
        throw new BadRequestException('Email already in use');
      }
      const hashedPassword = await bcrypt.hash(customerDto.Cus_Password, 10);
      const customer = await this.prisma.customer.create({
        data: {
          Cus_Name: customerDto.Cus_Name,
          Cus_Email: customerDto.Cus_Email,
          Cus_PhoneNumber: customerDto.Cus_PhoneNumber,

          Cus_Password: hashedPassword,
          Cus_CompanyName: customerDto.Cus_CompanyName,
          Cus_Logo: customerDto.Cus_Logo,
          Verify_State: false,
          Purchase_Goods: customerDto.Purchase_Goods,
        },
      });

      await this.emailService.sendEmail({
        to: customerDto.Cus_Email,
        template: EmailTemplate.CUSTOMER_WELCOME,
        context: {
          name: customerDto.Cus_Name,
          Link: `http://localhost:5173/CustomerVerify?customerId=${customer.CustomerId}`,
        },
      });

      return {
        message:
          'Customer registered successfully. Check your email for verification.',
        customer,
      };
    } catch (error) {
      console.error('Prisma error:', error);
      throw new BadRequestException(
        'Failed to register customer: ' + error.message,
      );
    }
  }

//    optional this services

  async changePassword(customerId: number, newPassword: string) {
    try {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      const customer = await this.prisma.customer.update({
        where: { CustomerId: customerId },
        data: { Cus_Password: hashedPassword },
      });
      return { message: 'Password changed successfully', customer };
    } catch (error) {
      console.error('Prisma error:', error);
      throw new BadRequestException(
        'Failed to change password: ' + error.message,
      );
    }
  }

  async verifyCustomerEmail(customerId: number) {
    try {
      const customer = await this.prisma.customer.update({
        where: { CustomerId: customerId },
        data: { Verify_State: true },
      });
      return { message: 'Email verified successfully', customer };
    } catch (error) {
      console.error('Prisma error:', error);
      throw new BadRequestException('Failed to verify email: ' + error.message);
    }
  }

  async getAllCustomers() {
    try {
      const customers = await this.prisma.customer.findMany();
      return customers;
    } catch (error) {
      console.error('Prisma error:', error);
      throw new BadRequestException(
        'Failed to retrieve customers: ' + error.message,
      );
    }
  }

  async removeCustomer(customerId: number, AdminId: number) {
    try {
      const admin = await this.prisma.admin.findUnique({
        where: { AdminId: AdminId },
      });
      if (!admin) {
        throw new UnauthorizedException('Admin not found');
      }
      const customer = await this.prisma.customer.delete({
        where: { CustomerId: customerId },
      });

      await this.emailService.sendEmail({
        to: customer.Cus_Email,
        template: EmailTemplate.CUSTOMER_REMOVE,
        context: {
          name: customer.Cus_Name,
        },
      });

      return { message: 'Customer deleted successfully', customer };
    } catch (error) {
      throw new BadRequestException(
        'Failed to delete customer: ' + error.message,
      );
    }
  }

  async updateCustomer(customerDto: CustomerDTO, AdminId: number) {
    try {
      const admin = await this.prisma.admin.findUnique({
        where: { AdminId: AdminId },
      });
      if (!admin) {
        throw new UnauthorizedException('Admin not found');
      }
      const customer = await this.prisma.customer.update({
        where: { CustomerId: customerDto.CustomerId },
        data: {
          Cus_Name: customerDto.Cus_Name,
          Cus_Email: customerDto.Cus_Email,
          Cus_PhoneNumber: customerDto.Cus_PhoneNumber,
          Cus_CompanyName: customerDto.Cus_CompanyName,
          Cus_Logo: customerDto.Cus_Logo,
          Purchase_Goods: customerDto.Purchase_Goods,
        },
      });
      return { message: 'Customer updated successfully', customer };
    } catch (error) {
      console.error('Prisma error:', error);
      throw new BadRequestException(
        'Failed to update customer: ' + error.message,
      );
    }
  }
}
