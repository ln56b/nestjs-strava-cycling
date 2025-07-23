import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { IActivity } from '../interfaces/activity.interfaces';

@Entity()
export class Activity implements IActivity {
  @PrimaryGeneratedColumn('uuid')
  uuid?: string;

  @Unique(['id'])
  @Column({ type: 'bigint' })
  id: string;

  @Column()
  athleteId: number;

  @Column()
  name: string;

  @Column()
  achievement_count: number;

  @Column()
  athlete_count: number;

  @Column({ type: 'float' })
  average_speed: number;

  @Column({ type: 'float', nullable: true })
  average_watts: number;

  @Column()
  commute: boolean;

  @Column({ type: 'float' })
  distance: number;

  @Column()
  elapsed_time: number;

  @Column({ type: 'float', nullable: true })
  elev_high: number | null;

  @Column({ type: 'float', nullable: true })
  elev_low: number | null;

  @Column()
  external_id: string;

  @Column()
  flagged: boolean;

  @Column({ nullable: true })
  gear_id: string | null;

  @Column({ nullable: true })
  location_city: string | null;

  @Column({ nullable: true })
  location_country: string | null;

  @Column({ nullable: true })
  location_state: string | null;

  @Column({ type: 'float' })
  max_speed: number;

  @Column({ type: 'float', nullable: true })
  max_watts: number;

  @Column()
  moving_time: number;

  @Column()
  private: boolean;

  @Column()
  sport_type: string;

  @Column()
  start_date: string;

  @Column()
  start_date_local: string;

  @Column()
  timezone: string;

  @Column({ type: 'float' })
  total_elevation_gain: number;

  @Column()
  trainer: boolean;

  @Column()
  type: string;

  @Column()
  utc_offset: number;

  @Column()
  visibility: string;

  @Column({ nullable: true })
  workout_type: number | null;
}
