import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../services/auth.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly authService: AuthService) {
    super();
  }

  handleRequest(err, user, info) {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
