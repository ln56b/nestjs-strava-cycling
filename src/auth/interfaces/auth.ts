import { UUID } from 'crypto';

export type AccessToken = {
  access_token: string;
};

export interface LoginResponse extends AccessToken {
  theme: string;
}

export type AccessTokenPayload = {
  userId: UUID;
  email: string;
};

export type SignupRequest = {
  email: string;
  password: string;
};
