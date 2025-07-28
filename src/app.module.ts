import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivityModule } from './activity/activity.module';
import { AuthModule } from './auth/auth.module';
import typeormConfig from './config/typeorm.config';
import { GearModule } from './gear/gear.module';
import { UserModule } from './user/user.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeormConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        configService.get('typeormConfig'),
    }),
    AuthModule,
    UserModule,
    ActivityModule,
    GearModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
