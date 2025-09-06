import { Module } from "@nestjs/common";
import  { PrismaModule } from "../../prisma/prisma.module";
import { DesignsService } from "./Designs.service";
import { DesignsController } from "./Designs.controller";

@Module({
  imports: [PrismaModule],
  controllers: [DesignsController],
  providers: [DesignsService],
})
export class DesignsModule {}
