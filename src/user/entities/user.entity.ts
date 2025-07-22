import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IUser } from '../interfaces/user.interfaces';

@Entity()
export class User implements IUser {
  @PrimaryGeneratedColumn('uuid')
  uuid?: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: 'dark' })
  theme: string;

  @Column({ nullable: true })
  strava_access_token?: string;

  @Column({ nullable: true })
  strava_code?: string;

  @Column({ nullable: true })
  last_login?: Date;

  @Column({ nullable: true })
  athleteId?: number;
}
