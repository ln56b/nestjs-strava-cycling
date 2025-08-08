import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IUser } from 'src/user/interfaces/user.interfaces';

import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/services/user.service';
import { AccessToken, LoginResponse, SignupRequest } from '../interfaces/auth';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async validateUser(email: string, password: string): Promise<IUser | null> {
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

  async login(user: IUser): Promise<LoginResponse> {
    const payload = { email: user.email, uuid: user.uuid };

    return {
      access_token: this.jwtService.sign(payload),
      theme: user.theme,
    };
  }

  async signup(user: SignupRequest): Promise<AccessToken> {
    const existingUser = await this.userService.findOneByEmail(user.email);
    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    const isPasswordValid =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{12,}$/;

    if (!user.password.match(isPasswordValid)) {
      throw new BadRequestException('Password does not match validation rules');
    }

    const hashedPassword = await this._hashPassword(user.password);

    const newUser = await this.userService.create({
      email: user.email,
      password: hashedPassword,
    });
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
