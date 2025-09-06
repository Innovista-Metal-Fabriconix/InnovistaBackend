import { AuthenticationService } from './Authentication.service';
import { AuthDTO } from './DTO/Authentication.DTO';
export declare class AuthenticationController {
    private authService;
    constructor(authService: AuthenticationService);
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
    refresh(refreshToken: string): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    logout(adminId: string): Promise<{
        message: string;
    }>;
    forgotPassword(req: any, newPassword: string): Promise<{
        message: string;
    }>;
}
