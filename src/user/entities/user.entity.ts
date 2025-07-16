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

  @Column({ nullable: true })
  strava_code?: string;

  @Column({ nullable: true })
  last_login?: Date;

  @Column({ default: 'dark' })
  theme: string;
}
