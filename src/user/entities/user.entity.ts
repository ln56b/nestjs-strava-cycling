import { UUID } from 'crypto';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id?: UUID;

  @Column({ unique: true })
  email: string;

  @Column() // TODO see if select : false is needed
  password: string;

  @Column()
  strava_id: number;

  @Column()
  strava_secret: string;

  @Column({ nullable: true })
  strava_token?: string;
}
