import { UUID } from 'crypto';

export interface IUser {
  uuid?: UUID;
  email: string;
  password: string;
  theme: string;
  athleteId?: number;
  strava_code?: string;
  last_login?: Date;
  strava_access_token?: string;
}

export interface StravaLoginResponse extends StravaRefreshTokenResponse {
  token_type: string;
  athlete: {
    id: number;
    username: string;
    resource_state: number;
    firstname: string;
    lastname: string;
    bio: string;
    city: string;
    state: string;
    country: string;
    sex: string;
    premium: boolean;
    summit: boolean;
    created_at: string;
    updated_at: string;
    badge_type_id: number;
    weight: number;
    profile_medium: string;
    profile: string;
    friend: string;
    follower: string;
  };
}

export interface StravaRefreshTokenResponse {
  expires_at: number;
  expires_in: number;
  refresh_token: string;
  access_token: string;
}
