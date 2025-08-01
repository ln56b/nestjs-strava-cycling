import { Body, Controller, Get, HttpStatus, Post, Put } from '@nestjs/common';
import { GetUser } from 'src/auth/decorators/user.decorator';
import { Endpoint } from 'src/shared/endpoint.enum';
import {
  IUser,
  StravaLoginResponse,
  StravaRefreshTokenResponse,
} from '../interfaces/user.interfaces';
import { UserService } from '../services/user.service';
import { Public } from 'src/auth/decorators/public.decorator';

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

  @Get('strava-authorize')
  @Public()
  async getStravaAuthorizationUrl(): Promise<{ url: string }> {
    const url = await this.userService.getStravaAuthorizationUrl();
    return url;
  }

  @Get('me')
  getMe(@GetUser() user: IUser): Promise<IUser> {
    return this.userService.findOneById(user.uuid);
  }
}
