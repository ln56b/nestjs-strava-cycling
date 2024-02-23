export interface User {
  id?: string;
  email: string;
  password: string;
  strava_id: number;
  strava_secret: string;
  strava_token?: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}
