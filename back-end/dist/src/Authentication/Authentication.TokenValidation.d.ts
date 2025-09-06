declare const TokenValidationStrategy_base: new (...args: any) => any;
export declare class TokenValidationStrategy extends TokenValidationStrategy_base {
    constructor();
    validate(payload: any): Promise<{
        userId: any;
        email: any;
        role: any;
    }>;
}
export {};
