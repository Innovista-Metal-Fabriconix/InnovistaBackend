import { OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
export declare class PrismaService extends PrismaClient implements OnModuleInit {
    [x: string]: any;
    Userdetals: any;
    onModuleInit(): Promise<void>;
}
