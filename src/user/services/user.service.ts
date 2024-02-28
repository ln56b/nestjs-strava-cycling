import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FakeGlobalService } from 'src/shared/global.service';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async updateStravaToken(token: string): Promise<string> {
    // TODO
    FakeGlobalService.user.strava_token = token;
    return FakeGlobalService.user.strava_token;
  }

  findOneByEmail(email: string): Promise<User> {
    return this.userRepository.findOneBy({ email });
  }

  create(user: User): Promise<User> {
    return this.userRepository.save(user);
  }
}
