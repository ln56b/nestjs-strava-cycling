import { HttpService } from '@nestjs/axios';
import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { firstValueFrom } from 'rxjs';
import { IUser } from 'src/user/interfaces/user.interfaces';
import { Repository } from 'typeorm';
import { Activity } from '../entities/activity.entity';
import { IStravaActivity } from '../interfaces/activity.interfaces';

@Injectable()
export class ActivityService {
  constructor(
    private readonly httpService: HttpService,
    @InjectRepository(Activity)
    private readonly activityRepository: Repository<Activity>,
  ) {}

  async getActivities(user: IUser): Promise<Activity[]> {
    const activities = await this.fetchStravaActivities(user);
    await this.saveActivities(activities);

    const activitiesInDB = await this.activityRepository.find({
      where: {
        athleteId: user.athleteId,
      },
    });

    return activitiesInDB;
  }

  async saveActivities(activities: IStravaActivity[]): Promise<Activity[]> {
    try {
      const activityEntities = activities.map(this.mapStravaActivityToEntity);

      const savedActivities = await this.activityRepository.save(
        activityEntities,
      );

      return savedActivities;
    } catch (error: any) {
      throw new InternalServerErrorException(error.message);
    }
  }

  fetchStravaActivities = async (user: IUser): Promise<IStravaActivity[]> => {
    let page = 1;
    const per_page = 200;
    const allActivities: IStravaActivity[] = [];

    const params = new URLSearchParams({
      per_page: per_page.toString(),
      page: page.toString(),
    });
    if (user.last_login) {
      const epochTime = Math.floor(user.last_login.getTime() / 1000);
      params.set('after', epochTime.toString());
    }

    try {
      while (true) {
        const response = await this.httpService.get(
          `https://www.strava.com/api/v3/athlete/activities?${params.toString()}`,
          {
            headers: {
              Authorization: `Bearer ${user.strava_access_token}`,
            },
          },
        );

        const activities = await firstValueFrom(response);
        allActivities.push(...activities.data);

        if (activities.data.length < per_page) {
          break;
        }

        page++;
      }
    } catch (error: any) {
      switch (error.response?.status) {
        case 401:
          throw new UnauthorizedException();
        case 403:
          throw new ForbiddenException();
        default:
          throw new InternalServerErrorException();
      }
    }

    console.log('allActivities', allActivities.length);
    return allActivities;
  };

  private mapStravaActivityToEntity(stravaActivity: IStravaActivity): Activity {
    const activity = new Activity();
    activity.id = stravaActivity.id;
    activity.athleteId = stravaActivity.athlete.id;
    activity.name = stravaActivity.name;
    activity.achievement_count = stravaActivity.achievement_count;
    activity.athlete_count = stravaActivity.athlete_count;
    activity.average_speed = stravaActivity.average_speed;
    activity.average_watts = stravaActivity.average_watts;
    activity.commute = stravaActivity.commute;
    activity.distance = stravaActivity.distance;
    activity.elapsed_time = stravaActivity.elapsed_time;
    activity.elev_high = stravaActivity.elev_high;
    activity.elev_low = stravaActivity.elev_low;
    activity.external_id = stravaActivity.external_id;
    activity.flagged = stravaActivity.flagged;
    activity.gear_id = stravaActivity.gear_id;
    activity.max_speed = stravaActivity.max_speed;
    activity.max_watts = stravaActivity.max_watts;
    activity.moving_time = stravaActivity.moving_time;
    activity.private = stravaActivity.private;
    activity.sport_type = stravaActivity.sport_type;
    activity.start_date = stravaActivity.start_date;
    activity.start_date_local = stravaActivity.start_date_local;
    activity.timezone = stravaActivity.timezone;
    activity.total_elevation_gain = stravaActivity.total_elevation_gain;
    activity.trainer = stravaActivity.trainer;
    activity.type = stravaActivity.type;
    activity.utc_offset = stravaActivity.utc_offset;
    activity.visibility = stravaActivity.visibility;
    activity.workout_type = stravaActivity.workout_type;
    return activity;
  }
}
