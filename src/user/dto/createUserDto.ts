import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  strava_id: number;

  @IsNotEmpty()
  strava_secret: string;

  strava_token?: string;
}
