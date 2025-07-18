import { Body, Controller, HttpStatus, Post, Put } from '@nestjs/common';
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

  @Post('strava-token')
  loginToStrava(
    @GetUser() user: User,
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
    @GetUser() user: User,
    @Body() body: { theme: string },
  ): Promise<HttpStatus> {
    return this.userService.updateTheme(user.uuid, body.theme);
  }

  @Put('last-login')
  updateLastLogin(@GetUser() user: User): Promise<HttpStatus> {
    return this.userService.updateLastLogin(user.uuid);
  }
}
