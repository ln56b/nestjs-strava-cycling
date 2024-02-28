import { Injectable } from '@nestjs/common';
import { User } from '../user.interfaces';
import { LoginDto } from './loginDto';

@Injectable()
export class DtoHelperService {
  // TODO remove
  createUserDtoToEntity(dto: any): User {
    return {
      email: dto.email,
      password: dto.password,
      strava_id: dto.strava_id,
      strava_secret: dto.strava_secret,
      strava_token: dto.strava_token,
    };
  }

  loginUserDtoToEntity(dto: LoginDto): Pick<User, 'email' | 'password'> {
    return {
      email: dto.email,
      password: dto.password,
    };
  }
}
