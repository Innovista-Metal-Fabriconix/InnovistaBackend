export declare class DebugController {
    test(): {
        status: string;
        timestamp: string;
        message: string;
    };
    checkEnv(): {
        JWT_PRIVATE_KEY: string;
        DATABASE_URL: string;
        FRONTEND_URL: string;
        NODE_ENV: string;
        PORT: string;
    };
}
