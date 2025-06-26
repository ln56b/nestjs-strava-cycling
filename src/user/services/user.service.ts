import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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

    const updatedUser = await this._save({
      ...foundUser,
      strava_code: code,
    });

    try {
      const stravaLoginResponse = await firstValueFrom(
        this.httpService.post(
          `https://www.strava.com/oauth/token?client_id=${updatedUser.strava_id}&code=${updatedUser.strava_code}&client_secret=${updatedUser.strava_secret}&grant_type=authorization_code`,
        ),
      );
      return stravaLoginResponse.data;
    } catch (error) {
      throw new HttpException(
        'An error occured while logging in to Strava',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  findOneByEmail(email: string): Promise<User> {
    const foundUser = this.userRepository.findOneBy({ email });
    if (!foundUser) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
    return foundUser;
  }

  async findOneById(id: UUID): Promise<User> {
    const foundUser = await this.userRepository.findOneBy({ id });
    if (!foundUser) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return foundUser;
  }

  async create(user: User): Promise<User> {
    try {
      const createdUser = await this.userRepository.save(user);
      return createdUser;
    } catch (error) {
      throw new HttpException(
        'An error occured while creating user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async refreshStravaToken(
    user: User,
    refreshToken: string,
  ): Promise<StravaRefreshTokenResponse> {
    const foundUser = await this.findOneById(user.id);

    try {
      const stravaRefreshTokenResponse = await firstValueFrom(
        this.httpService.post(
          `https://www.strava.com/oauth/token?client_id=${foundUser.strava_id}&client_secret=${foundUser.strava_secret}&grant_type=refresh_token&refresh_token=${refreshToken}`,
        ),
      );
      return stravaRefreshTokenResponse.data;
    } catch (error) {
      throw new HttpException(
        'An error occured while refreshing Strava token',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private async _save(user: User): Promise<User> {
    try {
      const savedUser = await this.userRepository.save(user);
      return savedUser;
    } catch (error) {
      throw new HttpException(
        'An error occured while saving user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
