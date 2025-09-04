import { Injectable, InternalServerErrorException } from '@nestjs/common';
import jwt from 'jsonwebtoken';

@Injectable()
export class TokenCreate {
  private readonly privateKey: string;

  constructor() {
    if (!process.env.JWT_PRIVATE_KEY) {
      throw new InternalServerErrorException(
        'JWT_PRIVATE_KEY environment variable is not set',
      );
    }

    // Replace escaped newlines if needed
    this.privateKey = process.env.JWT_PRIVATE_KEY.replace(/\\n/g, '\n');
  }

  createToken(admin: any): string {
    const payload = {
      AdminId: admin.AdminId,
      Admin_Name: admin.Admin_Name,
      Admin_Email: admin.Admin_Email,
      Admin_Phone: admin.Admin_Phone,
      Admin_Profile: admin.Admin_Profile,
      role: 'Admin',
    };


     // Uncomment the following line to use RS256 algorithm with an RSA private key
    //    return jwt.sign(payload, this.privateKey, {
    //     algorithm: 'RS256',
    //     expiresIn: '1h',
    //   });

    return jwt.sign(payload, this.privateKey, {
      algorithm: 'HS256',
      expiresIn: '1h',
    });
  }
}
