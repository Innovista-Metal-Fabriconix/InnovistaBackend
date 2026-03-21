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
  Request,
} from '@nestjs/common';
import { Request as ExpressRequest } from 'express';
import { CustomerDTO, UpdateCustomer } from './Customer.DTO';
import { CustomerService } from './Customer.service';
import { AdminAuthGuard } from '../Authentication/Authentication.AdminAuthgurd';

@Controller('customer')
export class CustomerController {
  constructor(private customerService: CustomerService) {}

  @UseGuards(AdminAuthGuard)
  @Post('Customer_register')
  async registerCustomer(
    @Body() customerDto: CustomerDTO,
    @Req() req: ExpressRequest & { user?: { userId: string } },
  ) {
    const AdminId = req.user?.userId;
    if (!AdminId) {
      throw new Error('AdminId is missing');
    }
    return this.customerService.registedCustomer(
      customerDto,
      parseInt(AdminId, 10),
    );
  }

  @UseGuards(AdminAuthGuard)
  @Get('getAllCustomers')
  async getAllCustomers(
    @Query('page') page: string,
    @Query('limit') limit: string,
  ) {
    return this.customerService.getAllCustomers(
      Number(page) || 1,
      Number(limit) || 10,
    );
  }

  @Post('verifyCustomer')
  async verifyCustomer(@Query('customerId') customerId: string) {
    return this.customerService.verifyCustomerEmail(parseInt(customerId, 10));
  }

  @UseGuards(AdminAuthGuard)
  @Delete('deleteCustomer')
  async deleteCustomer(
    @Query('customerId') customerId: string,
    @Req() req: ExpressRequest & { user?: { userId: string } },
  ) {
    const AdminId = req.user?.userId;
    if (!AdminId) {
      throw new Error('AdminId is missing');
    }
    return this.customerService.removeCustomer(
      parseInt(customerId, 10),
      parseInt(AdminId, 10),
    );
  }

  @UseGuards(AdminAuthGuard)
  @Put('updateCustomer')
  async updateCustomer(
    @Body() UpdateCustomer: UpdateCustomer,
    @Req() req: ExpressRequest & { user?: { userId: string } },
  ) {
    const AdminId = req.user?.userId;
    if (!AdminId) {
      throw new Error('AdminId is missing');
    }
    return this.customerService.updateCustomer(
      UpdateCustomer,
      parseInt(AdminId, 10),
    );
  }
}
