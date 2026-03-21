import * as jwt from 'jsonwebtoken';
export declare class TokenCreate {
    private readonly privateKey;
    constructor();
    createTokens(admin: {
        AdminId: string | number;
        Admin_Email: string;
        Admin_Name: string;
        Admin_Phone?: string;
        Admin_Profile?: string;
    }): {
        accessToken: string;
        refreshToken: string;
    };
    verifyToken(token: string): string | jwt.JwtPayload;
}
