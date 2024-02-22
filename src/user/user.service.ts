import { Injectable } from '@nestjs/common';
import { FakeGlobalService } from 'src/shared/global.service';
import { User } from 'src/shared/models/user.model';

@Injectable()
export class UserService {
  async get(): Promise<User> {
    return FakeGlobalService.user;
  }

  async updateStravaToken(token: string): Promise<string> {
    FakeGlobalService.user.strava_token = token;
    return FakeGlobalService.user.strava_token;
  }
}
