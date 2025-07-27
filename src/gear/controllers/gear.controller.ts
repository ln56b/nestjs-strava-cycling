import { Controller } from '@nestjs/common';
import { Endpoint } from 'src/shared/endpoint.enum';
import { GearService } from '../services/gear.service';

@Controller(Endpoint.GEAR)
export class GearController {
  constructor(private readonly gearService: GearService) {}
}
