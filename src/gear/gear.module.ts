import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from 'src/user/user.module';
import { Gear } from './entities/gear.entity';
import { GearController } from './controllers/gear.controller';
import { GearService } from './services/gear.service';

@Module({
  imports: [TypeOrmModule.forFeature([Gear]), HttpModule, UserModule],
  controllers: [GearController],
  providers: [GearService],
  exports: [GearService],
})
export class GearModule {}
