import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Endpoint } from 'src/shared/endpoint.enum';
import { User } from 'src/user/interfaces/user.interfaces';
import { Public } from '../decorators/public.decorator';
import { GetUser } from '../decorators/user.decorator';
import {
  AccessTokenDto,
  LoginResponseDto,
  SignupRequestDto,
} from '../dtos/auth.dto';
import { AuthService } from '../services/auth.service';

@Public()
@Controller(Endpoint.AUTH)
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post(Endpoint.LOGIN)
  login(
    @GetUser() user: User,
  ): Promise<LoginResponseDto | BadRequestException> {
    return this.authService.login(user);
  }

  @Post(Endpoint.SIGNUP)
  signup(
    @Body() signupBody: SignupRequestDto,
  ): Promise<AccessTokenDto | BadRequestException> {
    return this.authService.signup(signupBody);
  }
}
