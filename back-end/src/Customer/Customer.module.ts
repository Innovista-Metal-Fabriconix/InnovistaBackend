import { Module } from "@nestjs/common";
import  { PrismaModule } from "../../prisma/prisma.module";
import { CustomerService } from "./Customer.service";
import { CustomerController } from "./Customer.controller";
import { EmailModule } from "../Emails/Email.module";

@Module({
  imports: [PrismaModule, EmailModule],
  controllers: [CustomerController],
  providers: [CustomerService],
})
export class CustomerModule {}
