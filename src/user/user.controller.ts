import { Body, Controller, Get, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'src/shared/models/user.model';
import { Endpoint } from 'src/shared/endpoint.enum';

@Controller(Endpoint.USER)
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getUser(): Promise<User> {
    return this.userService.get();
  }

  @Put('strava-token')
  updateStravaToken(@Body() body: { code: string }): Promise<string> {
    console.log('Received in body strava token:', body.code);

    return this.userService.updateStravaToken(body.code);
  }
}
