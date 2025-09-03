import { Module } from "@nestjs/common";
import  { PrismaModule } from "../../prisma/prisma.module";
import { ConfigModule } from "@nestjs/config";
import { AuthenticationService } from "./Authentication.service";
import { AuthenticationController } from "./Authentication.controller";

@Module({
  imports: [PrismaModule, ConfigModule.forRoot()],
  controllers: [AuthenticationController],
  providers: [AuthenticationService],
})
export class AuthenticationModule {}
