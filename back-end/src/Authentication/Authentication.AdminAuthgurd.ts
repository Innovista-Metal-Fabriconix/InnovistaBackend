import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

interface JwtUser {
  id: number;
  email: string;
  role: string;
}

interface AuthenticatedRequest extends Request {
  user: JwtUser;
}

@Injectable()
export class AdminAuthGuard extends AuthGuard('jwt') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const activated = (await super.canActivate(context)) as boolean;

    if (!activated) return false;

    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();

    const user = request.user;

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    if (user.role !== 'Admin') {
      throw new UnauthorizedException('Only admins can access this route');
    }

    return true;
  }
}
