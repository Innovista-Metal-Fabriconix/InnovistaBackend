import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config'; // Import this

@Injectable()
export class TokenValidationStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private configService: ConfigService) { // Inject ConfigService
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      // Use configService.get() and tell TS it's definitely a string
      secretOrKey: configService.get<string>('JWT_PRIVATE_KEY')!,
    });
  }

  async validate(payload: any) {
    if (!payload || !payload.sub) {
      throw new UnauthorizedException('Invalid token');
    }

    return {
      userId: payload.sub,
      email: payload.email,
      role: payload.role, 
    };
  }
}