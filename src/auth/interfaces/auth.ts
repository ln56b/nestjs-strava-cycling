import { UUID } from 'crypto';

export type AccessToken = {
  access_token: string;
};

export type AccessTokenPayload = {
  userId: UUID;
  email: string;
};
