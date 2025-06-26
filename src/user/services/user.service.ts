import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { UUID } from 'crypto';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import {
  StravaLoginResponse,
  StravaRefreshTokenResponse,
} from '../interfaces/user.interfaces';

@Injectable()
export class UserService {
  constructor(
    private readonly httpService: HttpService,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async loginToStrava(user: User, code: string): Promise<StravaLoginResponse> {
    const foundUser = await this.userRepository.findOneBy({ id: user.id });

    if (!foundUser) {
      throw new Error('User not found');
    }
    const updatedUser = await this.userRepository.save({
      ...foundUser,
      strava_code: code,
    });

    const stravaLoginResponse = await firstValueFrom(
      this.httpService.post(
        `https://www.strava.com/oauth/token?client_id=${updatedUser.strava_id}&code=${updatedUser.strava_code}&client_secret=${updatedUser.strava_secret}&grant_type=authorization_code`,
      ),
    );

    return stravaLoginResponse.data;
  }

  findOneByEmail(email: string): Promise<User> {
    return this.userRepository.findOneBy({ email });
  }

  findOneById(id: UUID): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }

  create(user: User): Promise<User> {
    return this.userRepository.save(user);
  }

  async refreshStravaToken(
    user: User,
    refreshToken: string,
  ): Promise<StravaRefreshTokenResponse> {
    const foundUser = await this.userRepository.findOneBy({ id: user.id });

    if (!foundUser) {
      throw new Error('User not found');
    }

    const stravaRefreshTokenResponse = await firstValueFrom(
      this.httpService.post(
        `https://www.strava.com/oauth/token?client_id=${foundUser.strava_id}&client_secret=${foundUser.strava_secret}&grant_type=refresh_token&refresh_token=${refreshToken}`,
      ),
    );

    return stravaRefreshTokenResponse.data;
  }
}
