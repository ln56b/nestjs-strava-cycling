import { Body, Controller, HttpStatus, Post, Put } from '@nestjs/common';
import { GetUser } from 'src/auth/decorators/user.decorator';
import { Endpoint } from 'src/shared/endpoint.enum';
import {
  StravaLoginResponse,
  StravaRefreshTokenResponse,
  IUser,
} from '../interfaces/user.interfaces';
import { UserService } from '../services/user.service';

@Controller(Endpoint.USERS)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('strava-token')
  loginToStrava(
    @GetUser() user: IUser,
    @Body() body: { code: string },
  ): Promise<StravaLoginResponse> {
    return this.userService.loginToStrava(user.uuid, body.code);
  }

  @Post('strava-refresh-token')
  refreshStravaToken(
    @Body() body: { refreshToken: string },
  ): Promise<StravaRefreshTokenResponse> {
    return this.userService.refreshStravaToken(body.refreshToken);
  }

  @Put('theme')
  updateTheme(
    @GetUser() user: IUser,
    @Body() body: { theme: string },
  ): Promise<HttpStatus> {
    return this.userService.updateTheme(user.uuid, body.theme);
  }
}
