import { Module } from "@nestjs/common";
import  { PrismaModule } from "../../prisma/prisma.module";
import { ConfigModule } from "@nestjs/config";
import { AuthenticationService } from "./Authentication.service";
import { AuthenticationController } from "./Authentication.controller";
import { EmailModule } from "src/Emails/Email.module";
import { TokenCreate } from "./Authentication.TokenCreate";
import { TokenValidationStrategy } from "./Authentication.TokenValidation";
import { AdminAuthGuard } from "./Authentication.AdminAuthgurd";

@Module({
  imports: [PrismaModule, ConfigModule.forRoot(), EmailModule],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, TokenCreate ,TokenValidationStrategy, AdminAuthGuard],
  exports: [TokenCreate ,TokenValidationStrategy, AdminAuthGuard],
})
export class AuthenticationModule {}
