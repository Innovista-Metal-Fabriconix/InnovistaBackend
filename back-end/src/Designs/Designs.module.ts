import { Module } from "@nestjs/common";
import  { PrismaModule } from "../../prisma/prisma.module";
import { DesignsService } from "./Designs.service";
import { DesignsController } from "./Designs.controller"; 
import { EmailModule } from "src/Emails/Email.module";

@Module({
  imports: [PrismaModule, EmailModule],
  controllers: [DesignsController],
  providers: [DesignsService],
})
export class DesignsModule {}
