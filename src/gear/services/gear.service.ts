import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Gear, User } from '../entities/gear.entity';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import {
  IGear,
  IUser,
  StravaLoginResponse,
  StravaRefreshTokenResponse,
} from '../interfaces/gear.interfaces';
import { ConfigService } from '@nestjs/config';
import { SignupRequest } from 'src/auth/interfaces/auth';

@Injectable()
export class GearService {
  constructor(
    private readonly httpService: HttpService,
    @InjectRepository(Gear)
    private readonly gearRepository: Repository<Gear>,
    private configService: ConfigService,
  ) {}

  async getAthleteGear(athleteId: string): Promise<IGear[]> {
    const gear = await this.gearRepository.find({
      where: {
        user: {
          athleteId,
        },
      },
    });
    return gear;
  }
}
