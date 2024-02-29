import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/interfaces/user.interfaces';

import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/services/user.service';
import { AccessToken } from '../interfaces/auth';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userService.findOneByEmail(email);
    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }

    const isPasswordValid = await this._comparePassword(
      password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new BadRequestException('Invalid credentials');
    }
    return user;
  }

  async login(user: User): Promise<AccessToken> {
    const payload = { email: user.email, id: user.id };
    return { access_token: this.jwtService.sign(payload) };
  }

  async signup(user: User): Promise<AccessToken> {
    const existingUser = await this.userService.findOneByEmail(user.email);
    if (existingUser) {
      throw new BadRequestException('User already exists');
    }
    const hashedPassword = await this._hashPassword(user.password);
    const newUser = { ...user, password: hashedPassword };
    await this.userService.create(newUser);
    return this.login(newUser);
  }

  private async _hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  private async _comparePassword(
    password: string,
    storedHash: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, storedHash);
  }
}
