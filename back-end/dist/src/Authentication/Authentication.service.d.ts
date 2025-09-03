import { PrismaService } from '../../prisma/prisma.service';
import { AuthDTO } from './DTO/Authentication.DTO';
export declare class AuthenticationService {
    private prisma;
    constructor(prisma: PrismaService);
    register(authDto: AuthDTO): Promise<{
        message: string;
        admin: {
            Admin_Name: string;
            Admin_Email: string;
            Admin_Phone: string;
            Admin_Profile: string | null;
            Admin_Password: string;
            AdminId: number;
        };
    }>;
}
