import { Module } from "@nestjs/common";
import { PrismaModule } from "../../prisma/prisma.module";
import { ProjectsService } from "./Projects.service";
import { ProjectsController } from "./Projects.controller";
import { EmailModule } from "../Emails/Email.module";

@Module({
    imports: [PrismaModule, EmailModule],
    controllers: [ProjectsController],
    providers: [ProjectsService],
})
export class ProjectsModule {}
