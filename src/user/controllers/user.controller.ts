import { Body, Controller, Get, Put, Request } from '@nestjs/common';
import { Endpoint } from 'src/shared/endpoint.enum';
import { UserService } from '../services/user.service';
import { User } from '../user.interfaces';

@Controller(Endpoint.USERS)
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getUser(@Request() req): Promise<User> {
    return this.userService.findOneById(req.user?.id);
  }

  @Put('strava-token')
  async loginToStrava(
    @Request() req,
    @Body() body: { code: string },
  ): Promise<any> {
    // TODO - define return type
    return this.userService.loginToStrava(req.user, body.code);
  }
}
