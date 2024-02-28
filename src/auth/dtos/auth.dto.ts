import { AccessToken } from '../interfaces/auth';

export type LoginResponseDto = AccessToken;

export type SignupRequestDto = {
  email: string;
  password: string;
  strava_id: number;
  strava_secret: string;
};

export type SignupResponseDto = AccessToken;
