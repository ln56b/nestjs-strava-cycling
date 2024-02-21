export interface Login {
  email: string;
  password: string;
}

export interface Signup extends Login {
  strava_id: number;
  strava_secret: string;
}

export interface User extends Signup {
  id?: string;
  strava_token?: string;
}
