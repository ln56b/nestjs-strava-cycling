import { IsEmail, IsString, MinLength } from 'class-validator';
import { AccessToken, LoginResponse, SignupRequest } from '../interfaces/auth';

export class AccessTokenDto implements AccessToken {
  @IsString()
  access_token: string;
}

export class LoginResponseDto extends AccessTokenDto implements LoginResponse {
  @IsString()
  theme: string;
}

export class SignupRequestDto implements SignupRequest {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(3)
  password: string;
}
