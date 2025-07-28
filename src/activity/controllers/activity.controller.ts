import { Controller, Get } from '@nestjs/common';
import { IUser } from '../../user/interfaces/user.interfaces';
import { Endpoint } from 'src/shared/endpoint.enum';
import { ActivityService } from '../services/activity.service';
import { GetUser } from 'src/auth/decorators/user.decorator';
import { Activity } from '../entities/activity.entity';
import { UserService } from 'src/user/services/user.service';

@Controller(Endpoint.ACTIVITIES)
export class ActivityController {
  constructor(
    private readonly activityService: ActivityService,
    private readonly userService: UserService,
  ) {}

  @Get()
  async getActivities(@GetUser() user: IUser): Promise<Activity[]> {
    let userInDB = await this.userService.findOneById(user.uuid);

    if (!userInDB.athleteId) {
      await this.userService.updateAthlete(user);
    }

    userInDB = await this.userService.findOneById(user.uuid);

    const activities = await this.activityService.getAthleteActivities(
      userInDB,
    );

    this.userService.updateLastLogin(user.uuid);

    return activities;
  }
}
