import { PrismaService } from '../../prisma/prisma.service';
import { AuthDTO } from './DTO/Authentication.DTO';
import { EmailService } from '../Emails/Email.service';
import { TokenCreate } from './Authentication.TokenCreate';
export declare class AuthenticationService {
    private prisma;
    private emailService;
    private tokenCreate;
    constructor(prisma: PrismaService, emailService: EmailService, tokenCreate: TokenCreate);
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
        token: string;
    }>;
}
