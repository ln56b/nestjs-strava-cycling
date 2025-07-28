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
import { UserService } from 'src/user/services/user.service';
import { Repository } from 'typeorm';
import { Gear } from '../entities/gear.entity';
import { IStravaGear } from '../interfaces/gear.interfaces';

@Injectable()
export class GearService {
  constructor(
    private readonly httpService: HttpService,
    @InjectRepository(Gear)
    private readonly gearRepository: Repository<Gear>,
    private readonly userService: UserService,
  ) {}

  async getAthleteGears(user: IUser): Promise<Gear[]> {
    const athlete = await this.userService.getStravaAthlete(user);
    const gearIds: string[] = [];
    athlete.bikes?.forEach((bike) => {
      gearIds.push(bike.id);
    });
    athlete.shoes?.forEach((shoe) => {
      gearIds.push(shoe.id);
    });

    if (gearIds.length === 0) {
      return [];
    }

    const gears = await this.fetchStravaGears(gearIds, user);

    await this.saveAthleteGears(gears, athlete.id);

    const gearsInDB = await this.gearRepository.find({
      where: {
        user: {
          athleteId: user.athleteId,
        },
      },
    });
    return gearsInDB;
  }

  async fetchStravaGears(
    gearIds: string[],
    user: IUser,
  ): Promise<IStravaGear[]> {
    const gears: IStravaGear[] = [];
    for (const gearId of gearIds) {
      const gear = await this.fetchStravaGearById(gearId, user);
      gears.push(gear);
    }
    return gears;
  }

  async fetchStravaGearById(gearId: string, user: IUser): Promise<IStravaGear> {
    try {
      const response = await this.httpService.get(
        `https://www.strava.com/api/v3/gear/${gearId}`,
        {
          headers: {
            Authorization: `Bearer ${user.strava_access_token}`,
          },
        },
      );

      const gear = await firstValueFrom(response);
      return gear.data;
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
  }

  async saveAthleteGears(
    gears: IStravaGear[],
    userAthleteId: string,
  ): Promise<Gear[]> {
    const batchSize = 10;
    const batches = [];
    for (let i = 0; i < gears.length; i += batchSize) {
      batches.push(gears.slice(i, i + batchSize));
    }

    const savedGears: Gear[] = [];

    for (const batch of batches) {
      try {
        const gearEntities = batch.map((gear) =>
          this.mapStravaGearToEntity(gear, userAthleteId),
        );

        await this.gearRepository
          .createQueryBuilder()
          .insert()
          .orIgnore()
          .values(gearEntities)
          .execute();

        const insertedGear = await this.gearRepository.find({
          where: gearEntities.map((entity) => ({ id: entity.id })),
        });

        savedGears.push(...insertedGear);
      } catch (error: any) {
        throw new InternalServerErrorException(error.message);
      }
    }

    return savedGears;
  }

  private mapStravaGearToEntity(
    gear: IStravaGear,
    userAthleteId: string,
  ): Gear {
    const gearEntity = new Gear();
    gearEntity.id = gear.id;
    gearEntity.name = gear.name;
    gearEntity.primary = gear.primary;
    gearEntity.distance = gear.distance;
    gearEntity.brand = gear.brand_name;
    gearEntity.model = gear.model_name;
    gearEntity.athleteId = userAthleteId;
    return gearEntity;
  }
}
