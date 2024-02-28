import { UUID } from 'crypto';

export interface User {
  id?: UUID;
  email: string;
  password: string;
  strava_id: number;
  strava_secret: string;
  strava_token?: string;
}
