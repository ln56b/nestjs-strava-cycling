import { Body, Controller, Post, Put } from '@nestjs/common';
import { Endpoint } from 'src/shared/endpoint.enum';
import { CreateUserDto } from '../dto/createUserDto';
import { DtoHelperService } from '../dto/dto-helper-service';
import { LoginDto } from '../dto/loginDto';
import { UserService } from '../services/user.service';
import { LoginResponse, User } from '../user.interfaces';

@Controller(Endpoint.USERS)
export class UserController {
  constructor(
    private userService: UserService,
    private dtoHelperService: DtoHelperService,
  ) {}

  @Post()
  async create(@Body() body: CreateUserDto): Promise<User> {
    const userEntity = await this.dtoHelperService.createUserDtoToEntity(body);
    return this.userService.create(userEntity);
  }

  @Post(Endpoint.LOGIN)
  async login(@Body() body: LoginDto): Promise<LoginResponse> {
    const userCredentials = await this.dtoHelperService.loginUserDtoToEntity(
      body,
    );
    const jwt = await this.userService.login(userCredentials);
    return {
      access_token: jwt,
      token_type: 'JWT',
      expires_in: 3600,
    };
  }

  @Put('strava-token')
  updateStravaToken(@Body() body: { code: string }): Promise<string> {
    console.log('Received in body strava token:', body.code);

    return this.userService.updateStravaToken(body.code);
  }
}
