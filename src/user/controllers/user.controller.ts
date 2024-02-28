import { Body, Controller, Put } from '@nestjs/common';
import { Endpoint } from 'src/shared/endpoint.enum';
import { UserService } from '../services/user.service';

@Controller(Endpoint.USERS)
export class UserController {
  constructor(private userService: UserService) {}

  @Put('strava-token')
  updateStravaToken(@Body() body: { code: string }): Promise<string> {
    console.log('Received in body strava token:', body.code);

    return this.userService.updateStravaToken(body.code);
  }
}
