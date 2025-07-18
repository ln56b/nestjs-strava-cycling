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
import { ConfigService } from '@nestjs/config';
import { SignupRequest } from 'src/auth/interfaces/auth';

@Injectable()
export class UserService {
  constructor(
    private readonly httpService: HttpService,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private configService: ConfigService,
  ) {}

  async loginToStrava(
    userId: UUID,
    code: string,
  ): Promise<StravaLoginResponse> {
    const foundUser = await this._findOneById(userId);

    const updatedUser = await this._save({
      ...foundUser,
      strava_code: code,
    });

    try {
      const stravaLoginResponse = await firstValueFrom(
        this.httpService.post(
          `https://www.strava.com/oauth/token?client_id=${this.configService.get(
            'STRAVA_CLIENT_ID',
          )}&code=${
            updatedUser.strava_code
          }&client_secret=${this.configService.get(
            'STRAVA_CLIENT_SECRET',
          )}&grant_type=authorization_code`,
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

  async create(user: SignupRequest): Promise<User> {
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
    refreshToken: string,
  ): Promise<StravaRefreshTokenResponse> {
    try {
      const stravaRefreshTokenResponse = await firstValueFrom(
        this.httpService.post(
          `https://www.strava.com/oauth/token?client_id=${this.configService.get(
            'STRAVA_CLIENT_ID',
          )}&client_secret=${this.configService.get(
            'STRAVA_CLIENT_SECRET',
          )}&grant_type=refresh_token&refresh_token=${refreshToken}`,
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

  async updateTheme(userId: UUID, theme: string): Promise<HttpStatus> {
    const foundUser = await this._findOneById(userId);
    try {
      await this._save({
        ...foundUser,
        theme,
      });
      return HttpStatus.OK;
    } catch (error) {
      throw new HttpException(
        'An error occured while updating theme',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateLastLogin(userId: UUID): Promise<HttpStatus> {
    const foundUser = await this._findOneById(userId);
    try {
      await this._save({
        ...foundUser,
        last_login: new Date(),
      });
      return HttpStatus.OK;
    } catch (error) {
      throw new HttpException(
        'An error occured while updating last login',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private async _findOneById(uuid: UUID): Promise<User> {
    const foundUser = await this.userRepository.findOneBy({ uuid });
    if (!foundUser) {
      throw new NotFoundException(`User with id ${uuid} not found`);
    }
    return foundUser;
  }
}
