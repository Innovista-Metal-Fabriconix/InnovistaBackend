import { AuthenticationService } from "./Authentication.service";
import { AuthDTO } from "./DTO/Authentication.DTO";
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
    }>;
}
