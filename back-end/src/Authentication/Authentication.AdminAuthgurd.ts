import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class AdminAuthGuard extends AuthGuard('jwt') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const activated = (await super.canActivate(context)) as boolean;
    if (!activated) return false;

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (user.role !== 'Admin') {
      throw new UnauthorizedException('Only admins can access this route');
    }

    return true;
  }
}
