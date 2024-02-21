import { Body, Controller, Post } from '@nestjs/common';
import { Endpoint } from 'src/shared/endpoint.enum';
import { AuthService } from './auth.service';
import { SignupDto } from './signup.dto';
import { User } from 'src/shared/models/user.model';

@Controller(Endpoint.AUTH)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post(Endpoint.SIGNUP)
  signup(@Body() body: SignupDto): Promise<void> {
    return this.authService.signup(body);
  }

  @Post(Endpoint.LOGIN)
  login(@Body() body): Promise<User> {
    return this.authService.login(body);
  }

  @Post(Endpoint.LOGOUT)
  logout() {
    return this.authService.logout();
  }
}
