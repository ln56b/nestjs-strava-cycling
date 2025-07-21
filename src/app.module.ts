import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ActivityModule } from './activity/activity.module';
import typeormConfig from './config/typeorm.config';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [typeormConfig] }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        configService.get('typeormConfig'),
    }),
    AuthModule,
    UserModule,
    ActivityModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
