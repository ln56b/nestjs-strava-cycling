import { Body, Controller, Get, NotFoundException, Post } from '@nestjs/common';
import { GetUser } from 'src/auth/decorators/user.decorator';
import { Endpoint } from 'src/shared/endpoint.enum';
import {
  StravaLoginResponse,
  StravaRefreshTokenResponse,
  User,
} from '../interfaces/user.interfaces';
import { UserService } from '../services/user.service';

@Controller(Endpoint.USERS)
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getUser(@GetUser() user: User): Promise<User> {
    return this.userService.findOneById(user.id);
  }

  @Post('strava-token')
  loginToStrava(
    @GetUser() user: User,
    @Body() body: { code: string },
  ): Promise<StravaLoginResponse> {
    return this.userService.loginToStrava(user, body.code);
  }

  @Post('strava-refresh-token')
  refreshStravaToken(
    @GetUser() user: User,
    @Body() body: { refreshToken: string },
  ): Promise<StravaRefreshTokenResponse> {
    return this.userService.refreshStravaToken(user, body.refreshToken);
  }
}
