import { Module } from "@nestjs/common";
import  { PrismaModule } from "../../prisma/prisma.module";
import { ConfigModule } from "@nestjs/config";
import { AuthenticationService } from "./Authentication.service";
import { AuthenticationController } from "./Authentication.controller";
import { EmailModule } from "src/Emails/Email.module";
import { TokenCreate } from "./Authentication.TokenCreate";

@Module({
  imports: [PrismaModule, ConfigModule.forRoot(), EmailModule],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, TokenCreate],
  exports: [TokenCreate],
})
export class AuthenticationModule {}
