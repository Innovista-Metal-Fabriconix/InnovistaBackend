import { Body , Query , Post, Get ,Delete ,Put,Req } from "@nestjs/common";
import { Controller, UseGuards } from "@nestjs/common";
import { OrderDTO } from "./Order.DTO";
import { OrderService } from "./Order.service";
import { AdminAuthGuard } from "../Authentication/Authentication.AdminAuthgurd";

@Controller("order")
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Post("createOrder")
  async createOrder(@Body() orderDto: OrderDTO) {
    return this.orderService.createOrder(orderDto);
  }

  @Get("getAllOrders")
  async getAllOrders() {
    return this.orderService.getAllOrders();
  }

  @Get("getOrderById")
  async getOrderById(@Query("id") orderId: string) {
    return this.orderService.getOrderById(parseInt(orderId , 10));
  }
}