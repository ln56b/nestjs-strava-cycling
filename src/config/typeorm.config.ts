import { registerAs } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env' });

const config = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: +(process.env.DATABASE_PORT ?? 5432),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../migrations/*.ts'],
  synchronize: false,
  autoLoadEntities: true,
};

export default registerAs('typeormConfig', () => config);
export const connectionSource = new DataSource(config as DataSourceOptions);
