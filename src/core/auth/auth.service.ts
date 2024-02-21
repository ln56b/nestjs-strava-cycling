import { Injectable } from '@nestjs/common';
import { LoginDto, SignupDto } from './signup.dto';
import { FakeGlobalService } from 'src/shared/global.service';
import { User } from 'src/shared/models/user.model';

@Injectable()
export class AuthService {
  async signup(body: SignupDto): Promise<void> {
    try {
      FakeGlobalService.user = body;
    } catch (error) {
      if (FakeGlobalService.user) {
        throw new Error('User already exists');
      }
      throw new Error('Signup failed');
    }
    return;
  }

  async login(body: LoginDto): Promise<User> {
    if (!body.email || body.email !== FakeGlobalService.user?.email) {
      throw new Error('Invalid credentials');
    }
    if (
      FakeGlobalService.user &&
      FakeGlobalService.user.email === body.email &&
      FakeGlobalService.user.password === body.password
    ) {
      return FakeGlobalService.user;
    } else throw new Error('Invalid credentials');
  }

  async logout() {
    FakeGlobalService.user = null;
    return;
  }
}
