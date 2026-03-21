import { Body , Query , Post, Get ,Put} from "@nestjs/common";
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
  async getAllOrders(
    @Query("page") page: string,
    @Query("limit") limit: string,
  ) {
    return this.orderService.getAllOrders(
      Number(page) || 1,
      Number(limit) || 10,
    );
  }


  @UseGuards(AdminAuthGuard)
  @Get("getOrderById")
  async getOrderById(@Query("id") orderId: string) {
    return this.orderService.getOrderById(parseInt(orderId , 10));
  }

  @UseGuards(AdminAuthGuard)
  @Put("ChangeStates")
  async stateschnage(@Query("orderId") orderId: string ,@Query("Status") Status: string) {
    return this.orderService.chagetheStates(parseInt(orderId, 10), Status);
  }

  @Get("Getordes")
  async getordersUnique(@Query("Email") useremail: string) {
    return this.orderService.getcustomerORders(useremail);
  }

}