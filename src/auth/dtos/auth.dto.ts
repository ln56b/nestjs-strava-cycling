import { AccessToken } from '../interfaces/auth';

export type AuthResponseDto = AccessToken;

export type SignupRequestDto = {
  email: string;
  password: string;
};
