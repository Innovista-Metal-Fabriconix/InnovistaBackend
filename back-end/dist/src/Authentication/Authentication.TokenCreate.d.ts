import jwt from 'jsonwebtoken';
export declare class TokenCreate {
    private readonly privateKey;
    constructor();
    createTokens(admin: any): {
        accessToken: string;
        refreshToken: string;
    };
    verifyToken(token: string): string | jwt.JwtPayload;
}
