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
        tokens: {
            accessToken: string;
            refreshToken: string;
        };
    }>;
    login(email: string, password: string): Promise<{
        message: string;
        admin: {
            Admin_Name: string;
            Admin_Email: string;
            Admin_Phone: string;
            Admin_Profile: string | null;
            Admin_Password: string;
            AdminId: number;
        };
        tokens: {
            accessToken: string;
            refreshToken: string;
        };
    }>;
    refreshAccessToken(refreshToken: string): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    logout(adminId: number): Promise<{
        message: string;
    }>;
    passwordReset_Login(email: string): Promise<{
        message: string;
    }>;
    passwordReset(email: string, newPassword: string): Promise<{
        message: string;
    }>;
    GetallAdmins(): Promise<{
        Admin_Name: string;
        Admin_Email: string;
        Admin_Phone: string;
        Admin_Profile: string | null;
        Admin_Password: string;
        AdminId: number;
    }[]>;
    RemoveAdmin(adminId: number): Promise<{
        message: string;
    }>;
}
