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
import { CustomerDTO, UpdateCustomer } from './Customer.DTO';
import { CustomerService } from './Customer.service';
import { AdminAuthGuard } from '../Authentication/Authentication.AdminAuthgurd';

@Controller('customer')
export class CustomerController {
  constructor(private customerService: CustomerService) {}

  @UseGuards(AdminAuthGuard)
  @Post('Customer_register')
  async registerCustomer(@Body() customerDto: CustomerDTO, @Req() req) {
    const AdminId = req.user.userId;
    return this.customerService.registedCustomer(customerDto, AdminId);
  }

  @UseGuards(AdminAuthGuard)
  @Get('getAllCustomers')
  async getAllCustomers() {
    return this.customerService.getAllCustomers();
  }

  @Post('verifyCustomer')
  async verifyCustomer(@Query('customerId') customerId: string) {
    return this.customerService.verifyCustomerEmail(parseInt(customerId, 10));
  }

  @UseGuards(AdminAuthGuard)
  @Delete('deleteCustomer')
  async deleteCustomer(@Query('customerId') customerId: string, @Req() req) {
    const AdminId = req.user.userId;
    return this.customerService.removeCustomer(
      parseInt(customerId, 10),
      AdminId,
    );
  }

  @UseGuards(AdminAuthGuard)
  @Put('updateCustomer')
  async updateCustomer(@Body() UpdateCustomer: UpdateCustomer, @Req() req) {
    const AdminId = req.user.userId;
    return this.customerService.updateCustomer(
      UpdateCustomer,
      parseInt(AdminId, 10),
    );
  }
}
