import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { GetUser } from 'src/auth/decorators/user.decorator';
import { Endpoint } from 'src/shared/endpoint.enum';
import { UserService } from 'src/user/services/user.service';
import { IUser } from '../../user/interfaces/user.interfaces';
import { UpdateGearDto } from '../dtos/gear.dto';
import { Gear } from '../entities/gear.entity';
import { GearService } from '../services/gear.service';

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

  @Put(':gearId')
  async updateGear(
    @Param('gearId') gearId: string,
    @Body() updateGearDto: UpdateGearDto,
  ): Promise<Gear> {
    return this.gearService.updateGear(gearId, updateGearDto);
  }
}
