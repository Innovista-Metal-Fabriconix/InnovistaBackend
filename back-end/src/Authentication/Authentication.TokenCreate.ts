import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class TokenCreate {
  private readonly privateKey: string;

  constructor() {
    if (!process.env.JWT_PRIVATE_KEY) {
      throw new InternalServerErrorException(
        'JWT_PRIVATE_KEY environment variable is not set',
      );
    }
    this.privateKey = process.env.JWT_PRIVATE_KEY;
  }

  createTokens(admin: {
    AdminId: string | number;
    Admin_Email: string;
    Admin_Name: string;
    Admin_Phone?: string;
    Admin_Profile?: string;
  }) {
    const payload = {
      sub: admin.AdminId,
      email: admin.Admin_Email,
      name: admin.Admin_Name,
      phone: admin.Admin_Phone || null,
      profile: admin.Admin_Profile || null,
      role: 'Admin',
    };

    const accessToken = jwt.sign(payload, this.privateKey, {
      algorithm: 'HS256',
      expiresIn: '1h',
    });

    const refreshToken = jwt.sign({ sub: admin.AdminId }, this.privateKey, {
      algorithm: 'HS256',
      expiresIn: '7d',
    });

    return { accessToken, refreshToken };
  }

  verifyToken(token: string) {
    try {
      return jwt.verify(token, this.privateKey);
    } catch (err) {
      throw new InternalServerErrorException('Invalid token' + err);
    }
  }
}