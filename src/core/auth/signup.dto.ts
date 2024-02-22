export class LoginDto {
  email: string;
  password: string;
}

export class SignupDto extends LoginDto {
  strava_id: number;
  strava_secret: string;
}
