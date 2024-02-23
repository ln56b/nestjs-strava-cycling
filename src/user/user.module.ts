import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { AuthModule } from 'src/core/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { DtoHelperService } from './dto/dto-helper-service';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService, DtoHelperService],
})
export class UserModule {}
