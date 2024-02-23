import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @Column()
  strava_id: number;

  @Column()
  strava_secret: string;

  @Column({ nullable: true })
  strava_token?: string;
}
