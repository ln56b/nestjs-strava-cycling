import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/user.interfaces';

import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async generateJwt(user: User): Promise<string> {
    const payload = { email: user.email, sub: user.id };
    return this.jwtService.signAsync(payload);
  }

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }

  async comparePassword(
    password: string,
    storedHash: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, storedHash);
  }

  verifyJwt(token: string): Promise<any> {
    return this.jwtService.verifyAsync(token);
  }
}
