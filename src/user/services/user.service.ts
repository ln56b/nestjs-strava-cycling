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
  IUser,
  StravaLoginResponse,
  StravaRefreshTokenResponse,
} from '../interfaces/user.interfaces';
import { ConfigService } from '@nestjs/config';
import { SignupRequest } from 'src/auth/interfaces/auth';

@Injectable()
export class UserService {
  constructor(
    private readonly httpService: HttpService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private configService: ConfigService,
  ) {}

  async loginToStrava(
    userId: UUID,
    code: string,
  ): Promise<StravaLoginResponse> {
    const foundUser = await this.findOneById(userId);

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
      await this.updateStravaAccessToken(
        userId,
        stravaLoginResponse.data.access_token,
      );
      return stravaLoginResponse.data;
    } catch (error) {
      throw new HttpException(
        'An error occured while logging in to Strava',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  findOneByEmail(email: string): Promise<IUser> {
    const foundUser = this.userRepository.findOneBy({ email });
    if (!foundUser) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
    return foundUser;
  }

  async create(user: SignupRequest): Promise<IUser> {
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

  async updateTheme(userId: UUID, theme: string): Promise<HttpStatus> {
    const foundUser = await this.findOneById(userId);
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

  async updateStravaAccessToken(
    userId: UUID,
    accessToken: string,
  ): Promise<HttpStatus> {
    const foundUser = await this.findOneById(userId);
    try {
      await this._save({ ...foundUser, strava_access_token: accessToken });
      return HttpStatus.OK;
    } catch (error) {
      throw new HttpException(
        'An error occured while updating access token',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getStravaAuthorizationUrl(): Promise<{ url: string }> {
    const redirectUri = this.configService.get('STRAVA_REDIRECT_URI');
    const clientId = this.configService.get('STRAVA_CLIENT_ID');

    return {
      url: `https://www.strava.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}/dashboard&response_type=code&scope=read_all,activity:read_all,activity:write`,
    };
  }

  async updateLastLogin(userId: UUID): Promise<HttpStatus> {
    const foundUser = await this.findOneById(userId);
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

  async findOneById(uuid: UUID): Promise<IUser> {
    const foundUser = await this.userRepository.findOneBy({ uuid });
    if (!foundUser) {
      throw new NotFoundException(`User with id ${uuid} not found`);
    }
    return foundUser;
  }

  private async _save(user: IUser): Promise<IUser> {
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
