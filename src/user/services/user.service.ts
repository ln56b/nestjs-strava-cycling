import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FakeGlobalService } from 'src/shared/global.service';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { AuthService } from 'src/core/auth/services/auth.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private authService: AuthService,
  ) {}

  async create(newUser: User): Promise<User> {
    const emailExists = await this._emailExists(newUser.email);
    if (emailExists) {
      throw new HttpException('Email already exists', HttpStatus.CONFLICT);
    }

    const hashedPassword = await this.authService.hashPassword(
      newUser.password,
    );
    newUser.password = hashedPassword;
    newUser.email = newUser.email.toLowerCase();

    return this.userRepository.save(newUser);
  }

  async login(user: Pick<User, 'email' | 'password'>): Promise<string> {
    const foundUser = await this._findByEmail(user.email);
    if (!foundUser) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const isPasswordValid = await this.authService.comparePassword(
      user.password,
      foundUser.password,
    );
    if (!isPasswordValid) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    return this.authService.generateJwt(foundUser);
  }

  async updateStravaToken(token: string): Promise<string> {
    FakeGlobalService.user.strava_token = token;
    return FakeGlobalService.user.strava_token;
  }

  private async _emailExists(email: string): Promise<boolean> {
    const user = await this.userRepository.findOne({ where: { email } });
    return !!user;
  }

  private async _findByUuid(uuid: string): Promise<User> {
    return this.userRepository.findOne({ where: { id: uuid } });
  }

  private async _findByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ where: { email } });
  }
}
