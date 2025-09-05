import { ExecutionContext } from '@nestjs/common';
declare const AdminAuthGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class AdminAuthGuard extends AdminAuthGuard_base {
    canActivate(context: ExecutionContext): Promise<boolean>;
}
export {};
