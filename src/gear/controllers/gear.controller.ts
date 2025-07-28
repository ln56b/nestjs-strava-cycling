import { Controller, Get } from '@nestjs/common';
import { Endpoint } from 'src/shared/endpoint.enum';
import { GearService } from '../services/gear.service';
import { UserService } from 'src/user/services/user.service';
import { IUser } from '../../user/interfaces/user.interfaces';
import { GetUser } from 'src/auth/decorators/user.decorator';
import { Gear } from '../entities/gear.entity';

@Controller(Endpoint.GEARS)
export class GearController {
  constructor(
    private readonly gearService: GearService,
    private readonly userService: UserService,
  ) {}

  @Get()
  async getGears(@GetUser() user: IUser): Promise<Gear[]> {
    const userInDB = await this.userService.findOneById(user.uuid);

    return this.gearService.getAthleteGears(userInDB);
  }
}
