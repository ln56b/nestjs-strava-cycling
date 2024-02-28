import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { Endpoint } from 'src/shared/endpoint.enum';
import {
  LoginResponseDto,
  SignupRequestDto,
  SignupResponseDto,
} from '../dtos/auth.dto';
import { AuthGuard } from '@nestjs/passport';
import { Public } from '../decorators/public.decorator';

@Public()
@Controller(Endpoint.AUTH)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get() // TODO remove
  getHello(): string {
    return 'Hello World!';
  }

  @UseGuards(AuthGuard('local'))
  @Post(Endpoint.LOGIN)
  async login(@Request() req): Promise<LoginResponseDto | BadRequestException> {
    return this.authService.login(req.user);
  }

  @Post(Endpoint.SIGNUP)
  async signup(
    @Body() signupBody: SignupRequestDto,
  ): Promise<SignupResponseDto | BadRequestException> {
    return await this.authService.signup(signupBody);
  }
}
