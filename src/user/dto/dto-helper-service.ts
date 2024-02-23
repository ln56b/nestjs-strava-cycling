import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './createUserDto';
import { User } from '../user.interfaces';
import { LoginDto } from './loginDto';

@Injectable()
export class DtoHelperService {
  createUserDtoToEntity(dto: CreateUserDto): User {
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
